import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../../api/paymentsApi";

import styles from  "./Checkout.module.css";

function Checkout() {
  const { items, price } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const handlePayment = async () => {
    try {
      const response = await createCheckoutSession();

      window.location.href = response.data.url;
    } catch (error) {
      console.error("Stripe-fout:", error);
    }
  };

  return (
    <div className={styles.outer}>
    <main className={styles.checkoutPage}>
      <h1>Checkout</h1>

      <section className={styles.checkoutItems}>
        {items.map((item) => (
          <div key={item.id} className={styles.checkoutItem}>
            <div>
              <h3>{item.title}</h3>
              <p>Aantal: {item.quantity}</p>
            </div>

            <p>€{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </section>

      <section className={styles.checkoutSummary}>
        <h2>Totaal: €{price().toFixed(2)}</h2>

        <section className={styles.payButton}>
        <button  onClick={handlePayment}>
          pay with Stripe
        </button>
        </section>
      </section>
        <button onClick={() => navigate("/")}>Home</button>
    </main>
    </div>
  );
}

export default Checkout;