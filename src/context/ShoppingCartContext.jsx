import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext}  from "./AuthContext.jsx";

export const ShoppingCartContext = createContext({});

const ShoppingCartProvider = ({ children }) => {
    const { user, isLoggedOut } = useContext(AuthContext);
    const userId = user?.id;
    const [cartItems, setCartItems] = useState([]);
    const storageKey = `cart_${userId || "guest"}`;

    useEffect(() => {
        if (isLoggedOut) {
            localStorage.removeItem(storageKey);
            setCartItems([]);
            return;
        }

        const storedCart = localStorage.getItem(storageKey);
        if (storedCart) {
            setCartItems(JSON.parse(storedCart));
        }
    }, [userId, isLoggedOut]);

    useEffect(() => {
        if (!isLoggedOut) {
            localStorage.setItem(storageKey, JSON.stringify(cartItems));
        }
    }, [cartItems, storageKey, isLoggedOut]);

    const cart = (newItem) => {
        const quantityToAdd = parseInt(newItem.quantity) || 1;
        setCartItems(prevItems => {
            const existing = prevItems.find(item => item.id === newItem.id);
            return existing
                ? prevItems.map(item =>
                    item.id === newItem.id
                        ? { ...item, quantity: item.quantity + quantityToAdd }
                        : item
                )
                : [...prevItems, { ...newItem, quantity: quantityToAdd }];
        });
    };

    const reset = () => {
        setCartItems([]);
        localStorage.removeItem(storageKey);
    };

    const totalPrice = () =>
        cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const amountCart = () =>
        cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const increaseQuantity = (id) =>
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );

    const decreaseQuantity = (id) =>
        setCartItems(prev =>
            prev
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0)
        );

    const setQuantity = (id, amount) =>
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity: amount } : item
            )
        );

    const removeItem = (id) =>
        setCartItems(prev => prev.filter(item => item.id !== id));

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


















