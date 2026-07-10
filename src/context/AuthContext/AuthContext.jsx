import React, { createContext, useEffect, useState } from "react";
import { getUserFromToken } from "./authHelper";
import initialState from "./initialState";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthState({
        ...initialState,
        status: "done",
      });

      return;
    }

    try {
      setAuthState({
        isAuth: true,
        user: getUserFromToken(token),
        status: "done",
      });
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");

      setAuthState({
        ...initialState,
        status: "done",
      });
    }
  }, []);

  function logIn(token) {
    localStorage.setItem("token", token);

    setAuthState({
      isAuth: true,
      user: getUserFromToken(token),
      status: "done",
    });
  }

  function logOut() {
    localStorage.removeItem("token");

    setAuthState({
      ...initialState,
      status: "done",
    });
  }

  const contextData = {
    isAuth: authState.isAuth,
    user: authState.user,
    isLoggedOut: !authState.isAuth,
    logIn,
    logOut,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {authState.status === "pending" ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
