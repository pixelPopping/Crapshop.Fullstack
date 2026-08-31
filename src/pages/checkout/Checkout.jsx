import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ShoppingCartContext,
} from "../../context/ShoppingCartContext";

import { createCheckoutSession } from "../../api/paymentsApi";

import styles from "./Checkout.module.css";

function Checkout() {
  const {
    items = [],
    price,
    reSet,
    demoMode,
  } = useContext(
    ShoppingCartContext
  );

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  // ==========================================
  // PAYMENT
  // ==========================================

  const handlePayment = async () => {
    /*
     * DEMO CHECKOUT
     *
     * Geen backend en geen Stripe nodig.
     */

    if (demoMode) {
      setLoading(true);
      setMessage("");

      setTimeout(() => {
        reSet();

        setLoading(false);

        navigate(
          "/checkout/success"
        );
      }, 800);

      return;
    }

    /*
     * REAL STRIPE CHECKOUT
     */

    try {
      setLoading(true);
      setMessage("");

      const response =
        await createCheckoutSession();

      window.location.href =
        response.data.url;

    } catch (error) {
      console.error(
        "Stripe-fout:",
        error
      );

      /*
       * Als Stripe/backend onverwacht
       * niet beschikbaar is, gebruik
       * alsnog demo checkout.
       */

      setMessage(
        "Stripe is momenteel niet beschikbaar. Demo checkout wordt gebruikt."
      );

      setTimeout(() => {
        reSet();

        navigate(
          "/checkout/success"
        );
      }, 800);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (items.length === 0) {
    return (
      <div
        className={styles.outer}
      >
        <main
          className={
            styles.checkoutPage
          }
        >
          <h1>Checkout</h1>

          <p>
            Your shopping bag is
            empty.
          </p>

          <button
            type="button"
            onClick={() =>
              navigate("/Shop")
            }
          >
            Back to Shop
          </button>
        </main>
      </div>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className={styles.outer}>
      <main
        className={
          styles.checkoutPage
        }
      >
        <h1>Checkout</h1>

        {/* DEMO MESSAGE */}

        {demoMode && (
          <div
            className={
              styles.demoMessage
            }
          >
            Demo mode — no real
            payment will be processed.
          </div>
        )}

        {/* ERROR / INFO */}

        {message && (
          <p>
            {message}
          </p>
        )}

        {/* PRODUCTS */}

        <section
          className={
            styles.checkoutItems
          }
        >
          {items.map((item) => {
            const itemPrice =
              Number(item.price) ||
              0;

            const quantity =
              Number(
                item.quantity
              ) || 0;

            return (
              <div
                key={item.id}
                className={
                  styles.checkoutItem
                }
              >
                <div>
                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    Aantal:{" "}
                    {quantity}
                  </p>
                </div>

                <p>
                  €
                  {(
                    itemPrice *
                    quantity
                  ).toFixed(2)}
                </p>
              </div>
            );
          })}
        </section>

        {/* SUMMARY */}

        <section
          className={
            styles.checkoutSummary
          }
        >
          <h2>
            Totaal: €
            {price().toFixed(2)}
          </h2>

          <section
            className={
              styles.payButton
            }
          >
            <button
              type="button"
              onClick={
                handlePayment
              }
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : demoMode
                ? "Complete Demo Order"
                : "Pay with Stripe"}
            </button>
          </section>
        </section>

        {/* HOME */}

        <button
          type="button"
          onClick={() =>
            navigate("/")
          }
        >
          Home
        </button>
      </main>
    </div>
  );
}

export default Checkout;