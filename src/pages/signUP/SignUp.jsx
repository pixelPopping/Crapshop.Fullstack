import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import SignUpForm from "../../components/signUpForm/SignUpForm.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import axiosClient from "../../api/axiosClient.js";
import { registerUser } from "../../api/authApi";

import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";

import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";

import styles from "./SignUp.module.css";

function SignUp() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuth, user } = useContext(AuthContext);
  const { items: cartItems } = useContext(ShoppingCartContext);
  const { items: favoriteItems } = useContext(FavoriteContext);
  const params = new URLSearchParams(location.search);
  const zoekQuery = params.get("query")?.toLowerCase() || "";
  const [query, setQuery] = useState(zoekQuery);
  const [selectedCategory, setSelectedCategory] =useState("Alle categorieën");
  const [showModal, setShowModal] = useState(zoekQuery.length > 0);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleLogout = useHandleLogout();
  const filteredProducts = filterProducts(
    allProducts,
    query,
    selectedCategory
  );

  async function handleFormSubmit(data) {
    setLoading(true);
    setErrorMessage("");

    try {
      const body = {
        username: data.username,
        email: data.email,
        password: data.password,
        roles: ["user"],
        cart: [],
      };

      const response = await registerUser(body);

      console.log("Registratie succesvol:", response);

      navigate("/signin");
    } catch (error) {
      console.error("Registreren mislukt:", error);

      setErrorMessage("Registreren is mislukt.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.layoutSignup}>
      <nav>
        <div className={styles.buttonContainerSignup}>
          {isAuth ? (
            <>
              <div
                className="icon-item"
                onClick={handleLogout}
                title="Log uit"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </div>

              <div
                className="icon-item"
                title={`Ingelogd als ${
                  user?.username ?? "Onbekend"
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
            </>
          ) : (
            <>
              <div
                className={styles.iconItem}
                onClick={() => navigate("/signup")}
                title="Sign Up"
              >
                <FontAwesomeIcon icon={faUser} />
              </div>

              <div
                className={styles.iconItem}
                onClick={() => navigate("/signin")}
                title="Login"
              >
                <FontAwesomeIcon icon={faUser} />
              </div>
            </>
          )}

          {/* Winkelwagen */}
          <div
            className={styles.iconItem}
            onClick={() => navigate("/cart")}
            title="Winkelwagen"
          >
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faShoppingCart} />

              {cartItems.length > 0 && (
                <span className="icon-count">
                  {cartItems.length}
                </span>
              )}
            </div>
          </div>

          {/* Favorieten */}
          <div
            className="icon-item"
            onClick={() => navigate("/favorietenpage")}
            title="Favorieten"
          >
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faHeart} />

              {favoriteItems.length > 0 && (
                <span className="icon-count">
                  {favoriteItems.length}
                </span>
              )}
            </div>
          </div>

        </div>
      </nav>

      {/* =========================
          MAIN
      ========================= */}
      <main>

        {/* Zoekresultaten */}
        <section>
          {showModal && (
            <ShowModal
              query={query}
              selectedCategory={selectedCategory}
              filteredProducts={filteredProducts}
              setShowModal={setShowModal}
            />
          )}
        </section>

        {/* Registratieformulier */}
        <section>
          <SignUpForm
            onSubmit={handleFormSubmit}
            loading={loading}
            errorMessage={errorMessage}
          />
        </section>

      </main>

      {/* =========================
          FOOTER
      ========================= */}
      <footer>
        <FooterLayout />
      </footer>

    </div>
  );
}

export default SignUp;