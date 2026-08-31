import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  ShoppingCartContext,
} from "../../context/ShoppingCartContext.jsx";

import CartItem from "../../components/cartItem/CartItem.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import styles from "./Cart.module.css";

function Cart() {
  const {
    items = [],
    price,
    reSet,
    demoMode,
  } = useContext(ShoppingCartContext);

  const navigate = useNavigate();

  const totalProducts = items.reduce(
    (sum, item) =>
      sum + Number(item.quantity || 0),
    0
  );

  return (
    <div className={styles.mainCartOuter}>
      {/* NAVIGATION */}

      <nav className={styles.navbarFourCart}>
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          Home
        </button>

        <button
          type="button"
          onClick={() => navigate("/Shop")}
        >
          Shop
        </button>
      </nav>

      {/* CART */}

      <main className={styles.cartLayout}>
        <section className={styles.innerCart}>
          <h2>
            Shopping Bag –{" "}
            {items.length > 0
              ? items
                  .map((item) => item.title)
                  .join(", ")
              : "Leeg"}
          </h2>

          {/* DEMO MODE */}

          {demoMode && (
            <div className={styles.demoMessage}>
              Demo mode — your shopping bag is
              stored locally.
            </div>
          )}

          {/* EMPTY CART */}

          {items.length === 0 ? (
            <div>
              <p>
                Shopping Bag is empty.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/Shop")
                }
              >
                Go to Shop
              </button>
            </div>
          ) : (
            <>
              {/* CART ITEMS */}

              <div>
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>

              {/* SUMMARY */}

              <div
                className={
                  styles.resetContainer
                }
              >
                <p>
                  <strong>
                    Total products:
                  </strong>{" "}
                  {totalProducts}
                </p>

                <p>
                  <strong>
                    Total price:
                  </strong>{" "}
                  €
                  {price().toFixed(2)}
                </p>

                {/* BUTTONS */}

                <section
                  className={
                    styles.resetButton
                  }
                >
                  <button
                    type="button"
                    onClick={reSet}
                  >
                    Reset
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/checkout"
                      )
                    }
                  >
                    Check-Out
                  </button>
                </section>
              </div>
            </>
          )}
        </section>
      </main>

      {/* FOOTER */}

      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
}

export default Cart;