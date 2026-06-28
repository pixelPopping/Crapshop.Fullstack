import React from "react";
import "./Shopcard.css";

function Shopcard({ id, label, image, onClick, rating, price }) {
    return (
        <article className="card" onClick={onClick}>
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











