import { useContext } from "react";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import styles from "./FavorietenItem.module.css";

function FavorietenItem({ item }) {
  const { removeFavorite } = useContext(FavoriteContext);

  return (
    <section className={styles.favoriteLayout}>
      <div className={styles.favorietenItemInner}>
        <div className={styles.favorietenImageWrapper}>
          <img
            src={item.image}
            alt={item.title}
            onError={(e) => {
              e.target.src = "/assets/image/fallback.png";
            }}
          />
        </div>

        <div className={styles.favorietenTextButtons}>
          <p>
            {item.title} – €{item.price} × {item.quantity ?? 1} = €
            {(item.price * (item.quantity ?? 1)).toFixed(2)}
          </p>

          <div className={styles.buttonsFavorieten}>
            <button onClick={() => removeFavorite(item.id)}>Remove</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FavorietenItem;
