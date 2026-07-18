import React, { createContext, useEffect, useState } from "react";
import { getUserFromToken } from "./authHelper";
import initialState from "./initialState";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const [authState, setAuthState] = useState({
    isAuth: false,
    user: null,
    token: null,
    status: "pending",
  });

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
      const user = getUserFromToken(token);

      setAuthState({
        isAuth: true,
        user,
        token,
        status: "done",
      });
    } catch (error) {
      localStorage.removeItem("token");

      setAuthState({
        ...initialState,
        status: "done",
      });
    }
  }, []);

  function logIn(token) {
   
    localStorage.setItem("token", token);

    const user = getUserFromToken(token);

    setAuthState({
      isAuth: true,
      user,
      token,
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
    token: authState.token,
    isLoggedOut: !authState.isAuth,
    logIn,
    logOut,
  };
  return (
    <AuthContext.Provider value={contextData}>
      {authState.status === "pending" ? (
        <p>Loading...</p>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;