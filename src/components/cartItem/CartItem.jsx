import { useContext } from "react";
import DecrementButton from "../../components/deCrementButton/DecrementButton.jsx";
import InCrementButton from "../../components/counterbutton/InCrementButton.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import "./CartItem.css";

function CartItem({ item }) {
    const { removeItem } = useContext(ShoppingCartContext);

    return (
        <section className="outer-cart">
            <div className="cart-item-inner">
                {/* Product Image */}
                <div className="image-wrapper">
                    <img src={item.image} alt={item.title} />
                </div>

                {/* Text + Buttons */}
                <div className="cart-text-buttons">
                    <p className="cart-item-text">
                        {item.title} – €{item.price} × {item.quantity} = €
                        {(item.price * item.quantity).toFixed(2)}
                    </p>

                    <div className="buttons-cart">
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

