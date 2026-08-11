import { useContext } from "react";
import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import styles from  "./CartItem.module.css";

function CartItem({ item }) {
  const { removeItem } = useContext(ShoppingCartContext);

  return (
    <section className={styles.outerCart}>
      <div className={styles.cartItemInner}>
        {/* Product Image */}
        <div className={styles.imageWrapper}>
          <img src={item.image} alt={item.title} />
        </div>

        {/* Text + Buttons */}
        <div className={styles.cartTextButtons}>
          <p className={styles.cartItemText}>
            {item.title} – €{item.price} × {item.quantity} = €
            {(item.price * item.quantity).toFixed(2)}
          </p>

          <div className={styles.buttonsCart}>
            <DecrementButton id={item.id} />
            <InCrementButton id={item.id} />
            <button
              className="remove-button"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CartItem;
