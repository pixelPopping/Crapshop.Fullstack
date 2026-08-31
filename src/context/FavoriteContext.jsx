import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";

import { AuthContext } from "./AuthContext/AuthContext";

export const FavoriteContext =
  createContext({});

export const FavoriteProvider = ({
  children,
}) => {
  const { user } =
    useContext(AuthContext);

  const [items, setItems] =
    useState([]);

  // ==========================================
  // STORAGE KEY
  // ==========================================

  const getStorageKey = () =>
    user?.id
      ? `favorites_user_${user.id}`
      : "favorites_guest";

  // ==========================================
  // LOAD FAVORITES
  // ==========================================

  useEffect(() => {
    const key = getStorageKey();
    const stored =
      localStorage.getItem(key);

    if (!stored) {
      setItems([]);
      return;
    }

    try {
      const parsed =
        JSON.parse(stored);

      if (Array.isArray(parsed)) {
        setItems(parsed);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error(
        "Fout bij laden van favorieten:",
        error
      );

      setItems([]);
    }
  }, [user?.id]);

  // ==========================================
  // SAVE FAVORITES
  // ==========================================

  useEffect(() => {
    const key = getStorageKey();

    localStorage.setItem(
      key,
      JSON.stringify(items)
    );
  }, [items, user?.id]);

  // ==========================================
  // ADD FAVORITE
  // ==========================================

  const addFavorite = (item) => {
    setItems((prev) => {
      const exists = prev.some(
        (favorite) =>
          favorite.id === item.id
      );

      if (exists) {
        return prev;
      }

      return [...prev, item];
    });
  };

  // ==========================================
  // REMOVE FAVORITE
  // ==========================================

  const removeFavorite = (id) => {
    setItems((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );
  };

  // ==========================================
  // TOGGLE FAVORITE
  // ==========================================

  const toggleFavorite = (item) => {
    setItems((prev) => {
      const exists = prev.some(
        (favorite) =>
          favorite.id === item.id
      );

      if (exists) {
        return prev.filter(
          (favorite) =>
            favorite.id !== item.id
        );
      }

      return [...prev, item];
    });
  };

  // ==========================================
  // RESET
  // ==========================================

  const resetFavorites = () => {
    setItems([]);
  };

  // ==========================================
  // PROVIDER
  // ==========================================

  return (
    <FavoriteContext.Provider
      value={{
        items,

        addFavorite,

        removeFavorite,

        toggleFavorite,

        resetFavorites,

        totalFavorites:
          items.length,

        setItems,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;