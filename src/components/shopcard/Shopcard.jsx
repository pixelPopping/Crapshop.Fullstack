import React from "react";
import styles from "./Shopcard.module.css";

function Shopcard({ id, label, image, onClick, rating, price }) {
  return (
    <article className={styles.card} onClick={onClick}>
      <h3>
        {label} {id}
      </h3>
      <img src={image} alt={label} />
      <p className="price">Price: €{price}</p>
      <p className="rating">{rating} ⭐</p>
    </article>
  );
}

export default Shopcard;
