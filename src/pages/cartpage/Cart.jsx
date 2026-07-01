import React, { useContext, useState, useEffect } from "react";
import useProducts from "../../hooks/useProducts";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import filterProducts from "../../helpers/filteredProducts.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import CartItem from "../../components/cartItem/CartItem.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";
import "./Cart.css";

function Cart() {
  const { items = [], price, reSet } = useContext(ShoppingCartContext);
  const { isAuth, user } = useContext(AuthContext);
  const { items: favoriteItems } = useContext(FavoriteContext);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const zoekQuery = params.get("query")?.toLowerCase() || "";

  const [query, setQuery] = useState(zoekQuery);
  const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
  const [showModal, setShowModal] = useState(zoekQuery.length > 0);

  const { products, categories, loading, error } = useProducts();

  const filteredProducts = filterProducts(products, query, selectedCategory);

  const handleLogout = useHandleLogout();

  return (
    <>
      <main className="cart-layout">
        <section className="inner-cart">
          {loading ? (
            <p>Producten worden geladen...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <h2>
                Shopping Bag –{" "}
                {items.length > 0
                  ? items.map((item) => item.title).join(", ")
                  : "Leeg"}
              </h2>

              {items.length === 0 ? (
                <p>Shopping Bag is empty.</p>
              ) : (
                <>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}

                  <div className="reset-container">
                    <p>
                      <strong>Total products:</strong>{" "}
                      {items.reduce((sum, i) => sum + i.quantity, 0)}
                    </p>

                    <p>
                      <strong>Total price:</strong> €{price().toFixed(2)}
                    </p>

                    <div className="reset-button">
                      <button onClick={reSet}>Reset</button>

                      <button type="button">Check-Out</button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>

      <footer>
        <FooterLayout />
      </footer>
    </>
  );
}

export default Cart;
