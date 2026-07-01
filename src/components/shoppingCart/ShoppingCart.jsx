import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import "./ShoppingCart.css";

function ShoppingCart() {
  const { items, price } = useContext(ShoppingCartContext);

  return (
    <>
      <main className="shopping-cart">
        <section className="shopbag">
          <h2>Shopping Bag</h2>
          {items.length === 0 ? (
            <p className="empty-cart">Cart is empty.</p>
          ) : (
            <ul className="cart-items">
              {items.map((item) => (
                <li key={item.id} className="cart-item">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="item-image"
                  />
                  <div className="item-details">
                    <strong>{item.title}</strong>
                    <br />€{item.price?.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className="total-price">
            <strong>Totaleprice:</strong>{" "}
            {price().toFixed(2) ? `€${price().toFixed(2)}` : "€0,00"}
          </p>
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;
