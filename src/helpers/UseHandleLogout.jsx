import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext.jsx";
import { AuthContext } from "../context/AuthContext.jsx";

function UseHandleLogout() {
  const { resetFavorites } = useContext(FavoriteContext);
  const { logout, user } = useContext(AuthContext);

  const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

  return () => {
    const key = getStorageKey(user?.id);
    localStorage.removeItem(key);
    resetFavorites();
    logout();
  };
}

export default UseHandleLogout;
