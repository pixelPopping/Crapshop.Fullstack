import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./App.css";

import Home from "./pages/home/Home.jsx";
import Shop from "./pages/shop/Shop.jsx";
import DetailPagina from "./pages/detailPagina/DetailPagina.jsx";
import Cart from "./pages/cartpage/Cart.jsx";
import Profile from "./pages/profile/Profile.jsx";

import SignUp from "./pages/signUP/SignUp.jsx";
import SignIn from "./pages/signIn/SignIn.jsx";

import Recencies from "./pages/recencies/Recencies.jsx";
import Favorite from "./pages/favorietenpage/Favorite.jsx";

import Checkout from "./pages/checkout/Checkout.jsx";
import Success from "./pages/success/Succes.jsx";

import Gallery from "./pages/gallery/Gallery.jsx";
import Recipi from "./pages/recipi/Recipi.jsx";
import Croissants from "./pages/croissants/Croissants.jsx";

import Navigation from "./components/navbar/Navigation.jsx";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext/AuthContext.jsx";

function App() {
  const { isAuth } =
    useContext(AuthContext);

  return (
    <>
      <Navigation />

      <Routes>

        {/* =====================================
            PUBLIC PAGES
        ===================================== */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/shop"
          element={<Shop />}
        />

        <Route
          path="/detailpagina/:id"
          element={<DetailPagina />}
        />

        <Route
          path="/gallery"
          element={<Gallery />}
        />

        <Route
          path="/recipi"
          element={<Recipi />}
        />

        <Route
          path="/croissants"
          element={<Croissants />}
        />

        <Route
          path="/recencies"
          element={<Recencies />}
        />

        <Route
          path="/favorietenpage"
          element={<Favorite />}
        />

        {/* =====================================
            AUTH
        ===================================== */}

        <Route
          path="/signup"
          element={<SignUp />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        {/* =====================================
            CART
            Geen login nodig voor portfolio demo
        ===================================== */}

        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* =====================================
            CHECKOUT
            Geen login nodig voor demo
        ===================================== */}

        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* =====================================
            SUCCESS
        ===================================== */}

        <Route
          path="/success"
          element={<Success />}
        />

        <Route
          path="/checkout/success"
          element={<Success />}
        />

        {/* =====================================
            PROFILE
            Wel login/demo-login nodig
        ===================================== */}

        <Route
          path="/profile"
          element={
            isAuth ? (
              <Profile />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />

        {/* =====================================
            UNKNOWN ROUTE
        ===================================== */}

        <Route
          path="*"
          element={
            <Navigate to="/" replace />
          }
        />

      </Routes>
    </>
  );
}

export default App;