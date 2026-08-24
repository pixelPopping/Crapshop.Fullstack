import { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHeart,
  faShoppingCart,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import useProducts from "../../hooks/useProducts";
import { FavoriteContext } from "../../context/FavoriteContext";
import { AuthContext } from "../../context/AuthContext";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import FavorietenItem from "../../components/favorietenitem/FavorietenItem";
import ShowModal from "../../components/modal/ShowModal";
import FooterLayout from "../../components/Footer/FooterLayout";
import SearchBar from "../../components/searchFilter/SearchBar";
import useHandleLogout from "../../helpers/UseHandleLogout";
import filterProducts from "../../helpers/filteredProducts";
import styles from "./Favorite.module.css";

const FavorietenPage = () => {
  const {
    items = [],
    setItems,
    totalFavorites,
  } = useContext(FavoriteContext);

  const { user, isAuth } = useContext(AuthContext);

  const { items: cartItems = [] } = useContext(
    ShoppingCartContext
  );

  const navigate = useNavigate();
  const location = useLocation();

  const {
    products = [],
    categories = [],
    loading,
    error,
  } = useProducts();

  const handleLogout = useHandleLogout();
  const params = new URLSearchParams(location.search);

  const zoekQuery =
    params.get("query")?.toLowerCase() || "";

  const zoekCategory =
    params.get("category") || "Alle categorieën";

  const [query, setQuery] = useState(zoekQuery);

  const [selectedCategory, setSelectedCategory] =
    useState(zoekCategory);

  const [showModal, setShowModal] = useState(
    zoekQuery.length > 0
  );

  const getStorageKey = (userId) =>
    `Favorieten_${userId || "guest"}`;


  const filteredProducts = useMemo(() => {
    return filterProducts(
      products,
      query,
      selectedCategory
    );
  }, [products, query, selectedCategory]);

  const totaalPrijs = useMemo(() => {
    const total = items.reduce((acc, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;

      return acc + price * quantity;
    }, 0);

    return total.toFixed(2);
  }, [items]);


  useEffect(() => {
    const key = getStorageKey(user?.id);
    const stored = localStorage.getItem(key);

    if (!stored) {
      setItems([]);
      return;
    }

    try {
      const parsedItems = JSON.parse(stored);

      if (Array.isArray(parsedItems)) {
        setItems(parsedItems);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error(
        "Fout bij het laden van favorieten:",
        error
      );

      setItems([]);
    }
  }, [user?.id, setItems]);

  useEffect(() => {
    const key = getStorageKey(user?.id);

    localStorage.setItem(
      key,
      JSON.stringify(items)
    );
  }, [items, user?.id]);


  useEffect(() => {
    setQuery(zoekQuery);
    setSelectedCategory(zoekCategory);

    setShowModal(
      zoekQuery.length > 0 ||
        zoekCategory !== "Alle categorieën"
    );
  }, [zoekQuery, zoekCategory]);


  const handleSearchChange = (value) => {
    setQuery(value);

    navigate(
      `?query=${encodeURIComponent(
        value
      )}&category=${encodeURIComponent(
        selectedCategory
      )}`
    );

    setShowModal(value.length > 0);
  };


  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    navigate(
      `?query=${encodeURIComponent(
        query
      )}&category=${encodeURIComponent(value)}`
    );

    setShowModal(
      query.length > 0 ||
        value !== "Alle categorieën"
    );
  };


  return (
    <div className={styles.favoriteLayout}>
      <nav className={styles.navbarFourFavorites}>

        <ul className={styles.navLinks}>
          <li>
            <NavLink to="/gallery">
              Gallery
            </NavLink>
          </li>

          <li>
            <NavLink to="/recipi">
              Starter & Bread
            </NavLink>
          </li>

          <li>
            <NavLink to="/Shop">
              Bakkery
            </NavLink>
          </li>

          <li>
            <NavLink to="/">
              Home
            </NavLink>
          </li>
        </ul>

        {/* Search */}

        <SearchBar
          type="text"
          inputValue={query}
          inputCallback={handleSearchChange}
          selectedCategory={selectedCategory}
          onCategoryChange={
            handleCategoryChange
          }
          categories={categories}
        />

        {/* Icons */}

        <div className={styles.navIcons}>

          {/* ==================================
              AUTHENTICATED USER
          =================================== */}

          {isAuth ? (
            <>
              {/* Logout */}

              <button
                type="button"
                className={styles.iconItem}
                onClick={handleLogout}
                title="Log uit"
                aria-label="Log uit"
              >
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                />
              </button>

              {/* User */}

              <span
                className={styles.iconItem}
                title={`Ingelogd als ${
                  user?.username ?? "Onbekend"
                }`}
              >
                <FontAwesomeIcon icon={faUser} />
              </span>
            </>
          ) : (
            <>
              {/* Sign Up */}

              <button
                type="button"
                className={styles.iconItem}
                onClick={() =>
                  navigate("/signup")
                }
                title="Sign Up"
                aria-label="Sign Up"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>

              {/* Login */}

              <button
                type="button"
                className={styles.iconItem}
                onClick={() =>
                  navigate("/signin")
                }
                title="Login"
                aria-label="Login"
              >
                <FontAwesomeIcon icon={faUser} />
              </button>
            </>
          )}

          {/* ==================================
              SHOPPING CART
          =================================== */}

          <button
            type="button"
            className={styles.iconItem}
            onClick={() =>
              navigate("/cart")
            }
            title="Winkelwagen"
            aria-label="Winkelwagen"
          >
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faShoppingCart}
              />

              {cartItems.length > 0 && (
                <span
                  className={styles.iconCount}
                >
                  {cartItems.length}
                </span>
              )}
            </div>
          </button>

          {/* ==================================
              FAVORITES
          =================================== */}

          <button
            type="button"
            className={styles.iconItem}
            onClick={() =>
              navigate("/favorietenpage")
            }
            title="Favorieten"
            aria-label="Favorieten"
          >
            <div className={styles.iconWrapper}>
              <FontAwesomeIcon
                icon={faHeart}
              />

              {items.length > 0 && (
                <span
                  className={styles.iconCount}
                >
                  {items.length}
                </span>
              )}
            </div>
          </button>

        </div>
      </nav>

      {/* ======================================
          MAIN
      ======================================= */}

      <main className={styles.favoriteContent}>

        {loading ? (
          <p>
            Producten worden geladen...
          </p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <section
            className={styles.favoriteInner}
          >

            <h2>❤️ Favorites</h2>

            {/* ==================================
                EMPTY FAVORITES
            =================================== */}

            {items.length === 0 ? (
              <p>
                You haven't added any
                favorites yet.
              </p>
            ) : (
              <>

                {/* ==================================
                    FAVORITES
                =================================== */}

                <div
                  className={
                    styles.favorietenItemsGrid
                  }
                >
                  {items.map((item) => (
                    <FavorietenItem
                      key={item.id}
                      item={item}
                    />
                  ))}
                </div>

                {/* ==================================
                    SUMMARY
                =================================== */}

                <div
                  className={
                    styles.favorietenSummary
                  }
                >
                  <p>
                    <strong>
                      Total Price: €
                      {totaalPrijs}
                    </strong>
                  </p>

                  <p>
                    <em>
                      Total Favorites:{" "}
                      {totalFavorites}
                    </em>
                  </p>
                </div>

              </>
            )}

            {/* ==================================
                SEARCH MODAL
            =================================== */}

            {showModal && (
              <ShowModal
                query={query}
                selectedCategory={
                  selectedCategory
                }
                filteredProducts={
                  filteredProducts
                }
                setShowModal={
                  setShowModal
                }
              />
            )}

          </section>
        )}

      </main>

      {/* ======================================
          FOOTER
      ======================================= */}

      <footer>
        <FooterLayout />
      </footer>

    </div>
  );
};

export default FavorietenPage;