import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import { FavoriteContext } from "../../context/FavoriteContext";
import { AuthContext } from "../../context/AuthContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";

import FavorietenItem from "../../components/favorietenitem/FavorietenItem";
import ShowModal from "../../components/modal/ShowModal";
import FooterLayout from "../../components/footer/FooterLayout";
import SearchBar from "../../components/searchFilter/SearchBar";
import useHandleLogout from "../../helpers/useHandleLogout";
import filterProducts from "../../helpers/filteredProducts";
import "./Favorite.css";

const FavorietenPage = () => {
  const { items = [], setItems, totalFavorites } = useContext(FavoriteContext);
  const { user, isAuth } = useContext(AuthContext);
  const { items: cartItems } = useContext(ShoppingCartContext);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const zoekQuery = params.get("query")?.toLowerCase() || "";
  const zoekCategory = params.get("category") || "Alle categorieën";

  const [query, setQuery] = useState(zoekQuery);
  const [selectedCategory, setSelectedCategory] = useState(zoekCategory);
  const [showModal, setShowModal] = useState(zoekQuery.length > 0);
  const { products, categories, loading, error } = useProducts();

  const filteredProducts = useMemo(
    () => filterProducts(products, query, selectedCategory),
    [products, query, selectedCategory],
  );

  const handleLogout = useHandleLogout();
  const getStorageKey = (userId) => `Favorieten_${userId || "guest"}`;

  const totaalPrijs = items
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2);

  useEffect(() => {
    const key = getStorageKey(user?.id);
    const stored = localStorage.getItem(key);
    if (stored) {
      try {
        setItems(JSON.parse(stored));
      } catch (e) {}
    }
  }, [user?.id, setItems]);

  useEffect(() => {
    const key = getStorageKey(user?.id);
    localStorage.setItem(key, JSON.stringify(items));
  }, [items, user?.id]);

  useEffect(() => {
    if (!user) {
      const guestKey = getStorageKey("guest");
      const stored = localStorage.getItem(guestKey);
      setItems(stored ? JSON.parse(stored) : []);
    }
  }, [user, setItems]);

  return (
    <div className="favorite-layout">
      <nav className="navbar-four-favorites">
        <ul className="nav-links4">
          <li>
            <NavLink to="/products/men's clothing">Men</NavLink>
          </li>
          <li>
            <NavLink to="/products/women's clothing">Women</NavLink>
          </li>
          <li>
            <NavLink to="/Shop">Shop</NavLink>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
        </ul>

        <SearchBar
          type="text"
          inputValue={query}
          inputCallback={(value) => {
            setQuery(value);
            navigate(
              `?query=${encodeURIComponent(value)}&category=${encodeURIComponent(selectedCategory)}`,
            );
            setShowModal(true);
          }}
          selectedCategory={selectedCategory}
          onCategoryChange={(value) => {
            setSelectedCategory(value);
            setShowModal(true);
            navigate(
              `?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`,
            );
          }}
          categories={categories}
        />

        <div className="button-container-favorites">
          {isAuth ? (
            <>
              <button
                className="icon-item"
                onClick={handleLogout}
                title="Log uit"
              >
                <FontAwesomeIcon icon={faSignOutAlt} />
              </button>
              <span
                className="icon-item"
                title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
            </>
          ) : (
            <>
              <button
                className="icon-item"
                onClick={() => navigate("/signup")}
                title="Sign Up"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
              <button
                className="icon-item"
                onClick={() => navigate("/signin")}
                title="Login"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </>
          )}

          <button
            className="icon-item"
            onClick={() => navigate("/cart")}
            title="Winkelwagen"
          >
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItems.length > 0 && (
                <span className="icon-count">{cartItems.length}</span>
              )}
            </div>
          </button>

          <button
            className="icon-item"
            onClick={() => navigate("/favorietenpage")}
            title="Favorieten"
          >
            <div className="icon-wrapper">
              <FontAwesomeIcon icon={faHeart} />
              {items.length > 0 && (
                <span className="icon-count">{items.length}</span>
              )}
            </div>
          </button>
        </div>
      </nav>

      <main className="favorite-content">
        {loading ? (
          <p>Producten worden geladen...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <section className="favorite-inner">
            <h2>❤️ Favorites</h2>
            {items.length === 0 ? (
              <p>You havent add Favorites.</p>
            ) : (
              <div className="favorieten-items-grid">
                {items.map((item) => (
                  <FavorietenItem key={item.id} item={item} />
                ))}
                <div className="favorieten-summary">
                  <p>
                    <strong>Total Price: €{totaalPrijs}</strong>
                  </p>
                  <p>
                    <em>Total Favorites: {totalFavorites}</em>
                  </p>
                </div>
              </div>
            )}
            {showModal && (
              <ShowModal
                query={query}
                selectedCategory={selectedCategory}
                filteredProducts={filteredProducts}
                setShowModal={setShowModal}
              />
            )}
          </section>
        )}
      </main>
      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
};

export default FavorietenPage;
