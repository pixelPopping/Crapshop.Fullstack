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

  const refreshCart = async () => {
    try {
      const response = await getCart();

      setCartItems(response.data);
    } catch (error) {
      console.error("Fout bij ophalen winkelwagen:", error);
    }
  };

  useEffect(() => {
    if (isLoggedOut) {
      setCartItems([]);
      return;
    }

    if (userId) {
      refreshCart();
    }
  }, [userId, isLoggedOut]);

  const cart = async (newItem) => {
    const quantityToAdd = parseInt(newItem.quantity) || 1;

    try {
      await addToCart(newItem.id, quantityToAdd);

      await refreshCart();
    } catch (error) {
      console.error("Fout bij toevoegen:", error);
    }
  };

  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    try {
      await updateCart(id, item.quantity + 1);

      await refreshCart();
    } catch (error) {
      console.error("Fout bij verhogen:", error);
    }
  };

  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) return;

    try {
      if (item.quantity === 1) {
        await deleteCartItem(id);
      } else {
        await updateCart(id, item.quantity - 1);
      }

      await refreshCart();
    } catch (error) {
      console.error("Fout bij verlagen:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteCartItem(id);

      await refreshCart();
    } catch (error) {
      console.error("Fout bij verwijderen:", error);
    }
  };

  const reset = () => {
    setCartItems([]);
  };

  const totalPrice = () =>
    cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  const amountCart = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShoppingCartContext.Provider
      value={{
        items: cartItems,
        cart,
        refreshCart,
        reSet: reset,
        price: totalPrice,
        lengthcart: amountCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;