import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";

import CartItem from "../../components/cartItem/CartItem.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";
import Navigation from "../../components/navbar/Navigation.jsx";
import styles from "./Cart.module.css";

function Cart() {
  const { items = [], price, reSet } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  return (
    <>
      <div className={styles.mainCartOuter}>
        <nav className={styles.navbarFourCart}>
          <Navigation />
        </nav>

        <main className={styles.cartLayout}>
          <section className={styles.innerCart}>
            <h2>
              Shopping Bag –{" "}
              {items.length > 0
                ? items.map((item) => item.title).join(", ")
                : "Leeg"}
            </h2>

            {items.length === 0 ? (
              <p>Shopping Bag is empty.</p>
            ) : (
              <>
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}

                <div className={styles.resetContainer}>
                  <p>
                    <strong>Total products:</strong>{" "}
                    {items.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}
                  </p>

                  <p>
                    <strong>Total price:</strong> €
                    {price().toFixed(2)}
                  </p>
                  <div className={styles.resetContainer}>
                  <section className={styles.resetButton}>
                    <button onClick={reSet}>
                      Reset
                    </button>

                    <button onClick={() => navigate("/checkout")}>
                      Check-Out
                    </button>
                  </section>
                  </div>
                </div>
              </>
            )}
          </section>
        </main>
        <footer>
          <FooterLayout />
        </footer>
      </div>
    </>
  );
}

export default Cart;

