import { useContext } from "react";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";

function InCrementButton({id}) {
    const {increaseQuantity} = useContext(ShoppingCartContext);
    return (
        <div className="button">
            <button className="counter-button" onClick={() => increaseQuantity(id)} type="button">+</button>
        </div>
    );
}

export default InCrementButton;
