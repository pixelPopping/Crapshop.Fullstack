import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext.jsx";
import { AuthContext } from "../context/AuthContext/AuthContext.jsx";

function UseHandleLogout() {
  const { resetFavorites } = useContext(FavoriteContext);
  const { logOut, user } = useContext(AuthContext);

  const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

  return () => {
    const key = getStorageKey(user?.id);
    localStorage.removeItem(key);
    resetFavorites();
    logOut();
  };
}

export default UseHandleLogout;
