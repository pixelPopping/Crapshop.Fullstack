import {useContext} from "react";
import {ShoppingCartContext} from "../../context/ShoppingCartContext.jsx";

function DecrementButton({id}) {
    const {decreaseQuantity} = useContext(ShoppingCartContext);
    return (
        <div className="button">
            <button className="counter-button" onClick={() => decreaseQuantity(id)} type="button">-</button>
        </div>
    );
}

export default DecrementButton;
