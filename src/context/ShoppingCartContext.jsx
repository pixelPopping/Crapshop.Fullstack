import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";
import {
  getCart,
  addToCart,
  updateCart,
  deleteCartItem,
} from "../api/cartApi";
export const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {
  const { user, isLoggedOut } = useContext(AuthContext);
  const userId = user?.id;
  const [cartItems, setCartItems] = useState([]);
  const storageKey = `cart_${userId || "guest"}`;

  useEffect(() => {
  if (isLoggedOut) {
    setCartItems([]);
    return;
  }

  const fetchCart = async () => {
    try {
      const response = await getCart();
      setCartItems(response.data);
    } catch (error) {
      console.error("Fout bij ophalen winkelwagen:", error);
    }
  };

  if (userId) {
    fetchCart();
  }
}, [userId, isLoggedOut]);

  const cart = async (newItem) => {
  const quantityToAdd = parseInt(newItem.quantity) || 1;

  try {
    await addToCart(newItem.id, quantityToAdd);

    const response = await getCart();

    setCartItems(response.data);
  } catch (error) {
    console.error("Fout bij toevoegen aan winkelwagen:", error);
  }
};

  const reset = () => {
    setCartItems([]);
    localStorage.removeItem(storageKey);
  };

  const totalPrice = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const amountCart = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const increaseQuantity = async (id) => {
  const item = cartItems.find((item) => item.id === id);

  if (!item) {
    return;
  }

  try {
    await updateCart(id, item.quantity + 1);

    const response = await getCart();

    setCartItems(response.data);
  } catch (error) {
    console.error("Fout bij verhogen:", error);
  }
};

  const decreaseQuantity = async (id) => {
  const item = cartItems.find((item) => item.id === id);

  if (!item) {
    return;
  }

  try {
    if (item.quantity === 1) {
      await deleteCartItem(id);
    } else {
      await updateCart(id, item.quantity - 1);
    }

    const response = await getCart();

    setCartItems(response.data);
  } catch (error) {
    console.error("Fout bij verlagen:", error);
  }
};

  const setQuantity = (id, amount) =>
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: amount } : item,
      ),
    );

 const removeItem = async (id) => {
  try {
    await deleteCartItem(id);

    const response = await getCart();
       console.log("Na verwijderen:", response.data);

    console.log(response.data);

    setCartItems(response.data);
  } catch (error) {
    console.error("Fout bij verwijderen:", error);
  }
};
  return (
    <ShoppingCartContext.Provider
      value={{
        items: cartItems,
        cart,
        reSet: reset,
        price: totalPrice,
        lengthcart: amountCart,
        increaseQuantity,
        decreaseQuantity,
        setQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;
