import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { AuthContext } from "../context/AuthContext/AuthContext";

import {
  getCart,
  addToCart,
  updateCart,
  deleteCartItem,
} from "../api/cartApi";

export const ShoppingCartContext =
  createContext({});

const DEMO_CART_KEY =
  "crapshop_demo_cart";

const ShoppingCartProvider = ({
  children,
}) => {
  const { user, isLoggedOut } =
    useContext(AuthContext);

  const userId = user?.id;

  const [cartItems, setCartItems] =
    useState([]);

  const [demoMode, setDemoMode] =
    useState(false);

  // ==========================================
  // DEMO CART
  // ==========================================

  const getDemoCart = () => {
    try {
      const savedCart =
        localStorage.getItem(
          DEMO_CART_KEY
        );

      if (!savedCart) {
        return [];
      }

      const parsedCart =
        JSON.parse(savedCart);

      return Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch (error) {
      console.error(
        "Fout bij laden demo cart:",
        error
      );

      return [];
    }
  };

  const saveDemoCart = (cart) => {
    try {
      localStorage.setItem(
        DEMO_CART_KEY,
        JSON.stringify(cart)
      );
    } catch (error) {
      console.error(
        "Fout bij opslaan demo cart:",
        error
      );
    }
  };

  // ==========================================
  // LOAD CART
  // ==========================================

  const refreshCart = async () => {
    /*
     * Geen ingelogde gebruiker?
     * Gebruik demo/local cart.
     */

    if (!userId) {
      const demoCart =
        getDemoCart();

      setCartItems(demoCart);
      setDemoMode(true);

      return;
    }

    /*
     * Ingelogde gebruiker:
     * probeer eerst backend.
     */

    try {
      const response =
        await getCart();

      setCartItems(
        response.data || []
      );

      setDemoMode(false);

    } catch (error) {
      console.warn(
        "Backend cart unavailable."
      );

      const demoCart =
        getDemoCart();

      setCartItems(demoCart);
      setDemoMode(true);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    if (isLoggedOut) {
      /*
       * Voor een portfolio-demo willen
       * we de lokale cart behouden.
       */

      const demoCart =
        getDemoCart();

      setCartItems(demoCart);
      setDemoMode(true);

      return;
    }

    refreshCart();
  }, [
    userId,
    isLoggedOut,
  ]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const cart = async (newItem) => {
    const quantityToAdd =
      parseInt(
        newItem.quantity
      ) || 1;

    /*
     * DEMO MODE
     */

    if (demoMode || !userId) {
      const existingCart =
        getDemoCart();

      const existingItem =
        existingCart.find(
          (item) =>
            item.id ===
            newItem.id
        );

      let updatedCart;

      if (existingItem) {
        updatedCart =
          existingCart.map(
            (item) =>
              item.id ===
              newItem.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantityToAdd,
                  }
                : item
          );
      } else {
        updatedCart = [
          ...existingCart,
          {
            id: newItem.id,
            title: newItem.title,
            description:
              newItem.description,
            image: newItem.image,
            price: Number(
              newItem.price
            ),
            quantity:
              quantityToAdd,
          },
        ];
      }

      saveDemoCart(
        updatedCart
      );

      setCartItems(
        updatedCart
      );

      setDemoMode(true);

      return;
    }

    /*
     * BACKEND
     */

    try {
      await addToCart(
        newItem.id,
        quantityToAdd
      );

      await refreshCart();

    } catch (error) {
      console.warn(
        "Backend unavailable. Switching to demo cart."
      );

      const existingCart =
        getDemoCart();

      const existingItem =
        existingCart.find(
          (item) =>
            item.id ===
            newItem.id
        );

      let updatedCart;

      if (existingItem) {
        updatedCart =
          existingCart.map(
            (item) =>
              item.id ===
              newItem.id
                ? {
                    ...item,
                    quantity:
                      item.quantity +
                      quantityToAdd,
                  }
                : item
          );
      } else {
        updatedCart = [
          ...existingCart,
          {
            ...newItem,
            price: Number(
              newItem.price
            ),
            quantity:
              quantityToAdd,
          },
        ];
      }

      saveDemoCart(
        updatedCart
      );

      setCartItems(
        updatedCart
      );

      setDemoMode(true);
    }
  };

  // ==========================================
  // INCREASE
  // ==========================================

  const increaseQuantity =
    async (id) => {
      const item =
        cartItems.find(
          (cartItem) =>
            cartItem.id === id
        );

      if (!item) return;

      /*
       * DEMO
       */

      if (demoMode || !userId) {
        const updatedCart =
          cartItems.map(
            (cartItem) =>
              cartItem.id === id
                ? {
                    ...cartItem,
                    quantity:
                      cartItem.quantity +
                      1,
                  }
                : cartItem
          );

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        return;
      }

      /*
       * BACKEND
       */

      try {
        await updateCart(
          id,
          item.quantity + 1
        );

        await refreshCart();

      } catch (error) {
        const updatedCart =
          cartItems.map(
            (cartItem) =>
              cartItem.id === id
                ? {
                    ...cartItem,
                    quantity:
                      cartItem.quantity +
                      1,
                  }
                : cartItem
          );

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        setDemoMode(true);
      }
    };

  // ==========================================
  // DECREASE
  // ==========================================

  const decreaseQuantity =
    async (id) => {
      const item =
        cartItems.find(
          (cartItem) =>
            cartItem.id === id
        );

      if (!item) return;

      /*
       * DEMO
       */

      if (demoMode || !userId) {
        let updatedCart;

        if (
          item.quantity <= 1
        ) {
          updatedCart =
            cartItems.filter(
              (cartItem) =>
                cartItem.id !== id
            );
        } else {
          updatedCart =
            cartItems.map(
              (cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity -
                        1,
                    }
                  : cartItem
            );
        }

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        return;
      }

      /*
       * BACKEND
       */

      try {
        if (
          item.quantity === 1
        ) {
          await deleteCartItem(
            id
          );
        } else {
          await updateCart(
            id,
            item.quantity - 1
          );
        }

        await refreshCart();

      } catch (error) {
        let updatedCart;

        if (
          item.quantity === 1
        ) {
          updatedCart =
            cartItems.filter(
              (cartItem) =>
                cartItem.id !== id
            );
        } else {
          updatedCart =
            cartItems.map(
              (cartItem) =>
                cartItem.id === id
                  ? {
                      ...cartItem,
                      quantity:
                        cartItem.quantity -
                        1,
                    }
                  : cartItem
            );
        }

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        setDemoMode(true);
      }
    };

  // ==========================================
  // REMOVE
  // ==========================================

  const removeItem =
    async (id) => {
      /*
       * DEMO
       */

      if (demoMode || !userId) {
        const updatedCart =
          cartItems.filter(
            (item) =>
              item.id !== id
          );

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        return;
      }

      /*
       * BACKEND
       */

      try {
        await deleteCartItem(
          id
        );

        await refreshCart();

      } catch (error) {
        const updatedCart =
          cartItems.filter(
            (item) =>
              item.id !== id
          );

        saveDemoCart(
          updatedCart
        );

        setCartItems(
          updatedCart
        );

        setDemoMode(true);
      }
    };

  // ==========================================
  // RESET
  // ==========================================

  const reset = () => {
    setCartItems([]);

    localStorage.removeItem(
      DEMO_CART_KEY
    );
  };

  // ==========================================
  // TOTAL PRICE
  // ==========================================

  const totalPrice = () =>
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(
            item.quantity || 0
          ),
      0
    );

  // ==========================================
  // CART COUNT
  // ==========================================

  const amountCart = () =>
    cartItems.reduce(
      (sum, item) =>
        sum +
        Number(
          item.quantity || 0
        ),
      0
    );

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <ShoppingCartContext.Provider
      value={{
        items: cartItems,

        cart,

        refreshCart,

        reSet: reset,

        price: totalPrice,

        lengthcart:
          amountCart,

        increaseQuantity,

        decreaseQuantity,

        removeItem,

        demoMode,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartProvider;