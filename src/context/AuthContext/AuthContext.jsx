import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import initialState from "./initialState";
import { getUserFromToken } from "../AuthContext/authHelper";

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
  const navigate = useNavigate();
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
        console.error("Ongeldige token:", error);

        localStorage.removeItem("token");

        setAuthState({
            ...initialState,
            status: "done",
        });
    }
}, []);


function logIn(token) {
    try {
        localStorage.setItem("token", token);

        setAuthState({
            isAuth: true,
            user: getUserFromToken(token),
            status: "done",
        });

        navigate("/profile");
    } catch (error) {
        console.error("Ongeldige token:", error);
    }
}

 function logOut() {
    localStorage.removeItem("token");

    setAuthState({
        ...initialState,
        status: "done",
    });

    navigate("/");
}

const contextData = {
    isAuth: authState.isAuth,
    user: authState.user,
    isLoggedOut: !authState.isAuth,
    login: logIn,
    logout: logOut,
};


  return (
    <AuthContext.Provider value={contextData}>
      {authState.status === "pending" ? <p>Loading...</p> : children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;