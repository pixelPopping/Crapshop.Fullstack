import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import DropDown from "../dropdown/DropDown.jsx";
import styles from "./DetailCard.module.css";

function DetailCard({ id, label, text, image, price }) {
  const { cart } = useContext(ShoppingCartContext);
  const { toggleFavorite, items: favorieten } = useContext(FavoriteContext);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const isFavoriet = favorieten.some((item) => item.id === id);

  return (
    <div className={styles.outerContainerDetail}>
      <section>
        <article className={styles.innerContainer}>
          <div className={styles.cardContent}>
            <div className={styles.cardHeader}>
              <h2 className={styles.text}>{label}</h2>
              <p className={styles.cardText}>{text}</p>
              <p className={styles.cardText}>
                <strong>Prijs:</strong> €{price}
              </p>
            </div>
            <div className={styles.mainImg}>
              <img src={image} alt={label} />
            </div>
          </div>

          <div className={styles.cardContainer}>
            <div className={styles.cartButtons}>
              <DropDown
                value={selectedQuantity}
                onChange={setSelectedQuantity}
              />
              <button
                className={styles.addButton}
                onClick={() =>
                  cart({
                    id,
                    label,
                    text,
                    image,
                    price,
                    quantity: selectedQuantity,
                  })
                }
              >
                Cart
              </button>
              <button
                className={`${styles.favoriteButton} ${isFavoriet ? styles.favoriet : ""
}`}
                onClick={() =>
                  toggleFavorite({
                    id,
                    label,
                    text,
                    image,
                    price,
                    quantity: selectedQuantity,
                  })
                }
              >
                {isFavoriet ? "💖" : "🤍"}
              </button>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
}

export default DetailCard;
