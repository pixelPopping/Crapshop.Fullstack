import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./AuthContext/AuthContext";

export const FavoriteContext = createContext({});

export const FavoriteProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [items, setItems] = useState([]);

  const getStorageKey = () =>
    user?.id ? `favorites_user_${user.id}` : "favorites_guest";

  useEffect(() => {
    const key = getStorageKey();
    const stored = localStorage.getItem(key);

    if (stored) {
      setItems(JSON.parse(stored));
    } else {
      setItems([]);
    }
  }, [user?.id]);

  useEffect(() => {
    const key = getStorageKey();
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, user?.id]);

  const addFavorite = (item) => {
    if (!items.find((i) => i.id === item.id)) {
      setItems((prev) => [...prev, item]);
    }
  };

  const removeFavorite = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleFavorite = (item) => {
    if (items.find((i) => i.id === item.id)) {
      removeFavorite(item.id);
    } else {
      addFavorite(item);
    }
  };

  const resetFavorites = () => {
    setItems([]);
  };

  return (
    <FavoriteContext.Provider
      value={{
        items,
        addFavorite,
        removeFavorite,
        toggleFavorite,
        resetFavorites,
        totalFavorites: items.length,
        setItems,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;
