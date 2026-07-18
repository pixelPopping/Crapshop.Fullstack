import { useCallback, useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext.jsx";
import { AuthContext } from "../context/AuthContext/AuthContext.jsx";

function useHandleLogout() {
  const { resetFavorites } = useContext(FavoriteContext);
  const { logOut, user } = useContext(AuthContext);

  const handleLogout = useCallback(() => {
    const storageKey = `Favorieten_${user?.id ?? "guest"}`;

    localStorage.removeItem(storageKey);

    resetFavorites();
    logOut();
  }, [user, resetFavorites, logOut]);

  return handleLogout;
}

export default useHandleLogout;