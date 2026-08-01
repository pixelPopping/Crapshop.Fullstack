import React, { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { checkout } from "../../api/ordersApi";
import { useNavigate } from "react-router-dom";

import "./Checkout.css";

function Checkout() {
  const { items, price, refreshCart } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      const response = await checkout();

      await refreshCart();

      alert(
        `Bestelling geplaatst! Ordernummer: ${response.data.order_id}`
      );

      navigate("/success");
    } catch (error) {
      console.error("Checkout mislukt:", error);
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

        <button onClick={handleCheckout}>
          Bestelling plaatsen
        </button>
      </section>
    </main>
  );
}

export default Checkout;