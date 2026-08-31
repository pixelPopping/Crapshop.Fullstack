import React, {
  createContext,
  useEffect,
  useState,
} from "react";

import { getUserFromToken } from "./authHelper";
import initialState from "./initialState";

export const AuthContext =
  createContext({});

const DEMO_USER_KEY =
  "crapshop_demo_user";

function AuthContextProvider({
  children,
}) {
  const [authState, setAuthState] =
    useState({
      isAuth: false,
      user: null,
      token: null,
      status: "pending",
    });

  // ==========================================
  // LOAD AUTHENTICATION
  // ==========================================

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    const demoUser =
      localStorage.getItem(
        DEMO_USER_KEY
      );

    // ------------------------------------------
    // REAL LOGIN
    // ------------------------------------------

    if (token) {
      try {
        const user =
          getUserFromToken(token);

        setAuthState({
          isAuth: true,
          user,
          token,
          status: "done",
        });

        return;
      } catch (error) {
        console.warn(
          "Ongeldige JWT gevonden."
        );

        localStorage.removeItem(
          "token"
        );
      }
    }

    // ------------------------------------------
    // DEMO LOGIN
    // ------------------------------------------

    if (demoUser) {
      try {
        const user =
          JSON.parse(demoUser);

        setAuthState({
          isAuth: true,
          user,
          token: null,
          status: "done",
        });

        return;
      } catch (error) {
        console.error(
          "Demo user kon niet worden geladen:",
          error
        );

        localStorage.removeItem(
          DEMO_USER_KEY
        );
      }
    }

    // ------------------------------------------
    // NOT LOGGED IN
    // ------------------------------------------

    setAuthState({
      ...initialState,
      status: "done",
    });
  }, []);

  // ==========================================
  // REAL LOGIN
  // ==========================================

  function logIn(token) {
    try {
      localStorage.removeItem(
        DEMO_USER_KEY
      );

      localStorage.setItem(
        "token",
        token
      );

      const user =
        getUserFromToken(token);

      setAuthState({
        isAuth: true,
        user,
        token,
        status: "done",
      });
    } catch (error) {
      console.error(
        "Login mislukt:",
        error
      );

      localStorage.removeItem(
        "token"
      );

      setAuthState({
        ...initialState,
        status: "done",
      });
    }
  }

  // ==========================================
  // DEMO LOGIN
  // ==========================================

  function demoLogin() {
    const demoUser = {
      id: "demo-user",
      username: "Demo User",
      firstname: "Demo",
      lastname: "User",
      email: "demo@crapshop.demo",
      role: "demo",
      isDemo: true,
    };

    localStorage.removeItem(
      "token"
    );

    localStorage.setItem(
      DEMO_USER_KEY,
      JSON.stringify(demoUser)
    );

    setAuthState({
      isAuth: true,
      user: demoUser,
      token: null,
      status: "done",
    });
  }

  // ==========================================
  // LOGOUT
  // ==========================================

  function logOut() {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      DEMO_USER_KEY
    );

    setAuthState({
      ...initialState,
      status: "done",
    });
  }

  // ==========================================
  // CONTEXT
  // ==========================================

  const contextData = {
    isAuth: authState.isAuth,

    user: authState.user,

    token: authState.token,

    isLoggedOut:
      !authState.isAuth,

    logIn,

    demoLogin,

    logOut,

    isDemo:
      authState.user?.isDemo === true,
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <AuthContext.Provider
      value={contextData}
    >
      {authState.status ===
      "pending" ? (
        <p>Loading...</p>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;