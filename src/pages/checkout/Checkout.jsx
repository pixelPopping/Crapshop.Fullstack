import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { useNavigate } from "react-router-dom";
import { createCheckoutSession } from "../../api/paymentsApi";

import "./Checkout.css";

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
    <main className="checkout-page">
      <h1>Checkout</h1>

      <section className="checkout-items">
        {items.map((item) => (
          <div key={item.id} className="checkout-item">
            <div>
              <h3>{item.title}</h3>
              <p>Aantal: {item.quantity}</p>
            </div>

            <p>€{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </section>

      <section className="checkout-summary">
        <h2>Totaal: €{price().toFixed(2)}</h2>

        <button onClick={handlePayment}>
          Betaal met Stripe
        </button>
      </section>
    </main>
  );
}

export default Checkout;