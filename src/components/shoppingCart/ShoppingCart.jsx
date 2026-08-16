import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import styles from "./ShoppingCart.module.css";

function ShoppingCart() {
  const { items, price } = useContext(ShoppingCartContext);

  return (
    <>
      <main className={styles.shoppingCart}>
        <section className={styles.shopbag}>
          <h2>Shopping Bag</h2>
          {items.length === 0 ? (
            <p className={styles.emptyCart}>Cart is empty.</p>
          ) : (
            <ul className={styles.cartItems}>
              {items.map((item) => (
                <li key={item.id} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemDetails}>
                    <strong>{item.title}</strong>
                    <br />€{item.price?.toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <p className={styles.totalPrice}>
            <strong>Totaleprice:</strong>{" "}
            {price().toFixed(2) ? `€${price().toFixed(2)}` : "€0,00"}
          </p>
        </section>
      </main>
    </>
  );
}

export default ShoppingCart;
