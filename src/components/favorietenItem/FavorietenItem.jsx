import { useContext } from "react";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import "./FavorietenItem.css";

function FavorietenItem({ item }) {
    const { removeFavorite } = useContext(FavoriteContext);

    return (
        <section className="outer-favorieten">
            <div className="favorieten-item-inner">
                <div className="favorieten-image-wrapper">
                    <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                            e.target.src = "/assets/image/fallback.png";
                        }}
                    />
                </div>

                <div className="favorieten-text-buttons">
                    <p>
                        {item.title} – €{item.price} × {item.quantity ?? 1} = €
                        {(item.price * (item.quantity ?? 1)).toFixed(2)}
                    </p>

                    <div className="buttons-favorieten">
                        <button onClick={() => removeFavorite(item.id)}>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FavorietenItem;









