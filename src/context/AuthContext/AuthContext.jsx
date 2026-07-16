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

  console.log("========== AUTH STATE ==========");
  console.log(authState);

  useEffect(() => {
    console.log("AuthContext useEffect gestart");

    const token = localStorage.getItem("token");

    console.log("Token uit localStorage:", token);

    if (!token) {
      console.log("Geen token gevonden.");

      setAuthState({
        ...initialState,
        status: "done",
      });

      return;
    }

    try {
      const user = getUserFromToken(token);

      console.log("Gebruiker uit token:", user);

      setAuthState({
        isAuth: true,
        user,
        token,
        status: "done",
      });

      console.log("Authenticatie succesvol.");
    } catch (error) {
      console.error("Fout bij uitlezen token:", error);

      localStorage.removeItem("token");

      setAuthState({
        ...initialState,
        status: "done",
      });
    }
  }, []);

  function logIn(token) {
    console.log("====== LOGIN ======");
    console.log("Ontvangen token:", token);

    localStorage.setItem("token", token);

    const user = getUserFromToken(token);

    console.log("User uit JWT:", user);

    setAuthState({
      isAuth: true,
      user,
      token,
      status: "done",
    });
  }

  function logOut() {
    console.log("====== LOGOUT ======");

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

  console.log("========== CONTEXT DATA ==========");
  console.log(contextData);

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