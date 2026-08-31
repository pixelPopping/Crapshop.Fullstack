import {
  useContext,
  useMemo,
  useState,
} from "react";

import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSignOutAlt,
  faUser,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import useProducts from "../../hooks/useProducts";

import styles from "./Shop.module.css";

import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import Shopcard from "../../components/shopcard/Shopcard.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import {
  ShoppingCartContext,
} from "../../context/ShoppingCartContext.jsx";

import {
  AuthContext,
} from "../../context/AuthContext/AuthContext.jsx";

import {
  FavoriteContext,
} from "../../context/FavoriteContext.jsx";

import useHandleLogout from "../../helpers/UseHandleLogout.jsx";

function ShopPagina() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // URL PARAMETERS
  // ==========================================

  const params =
    new URLSearchParams(
      location.search
    );

  const categoryFromUrl =
    params.get("category") || "";

  const queryFromUrl =
    params.get("query") || "";

  // ==========================================
  // STATE
  // ==========================================

  const [query, setQuery] =
    useState(queryFromUrl);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(categoryFromUrl);

  // ==========================================
  // CONTEXTS
  // ==========================================

  const {
    items = [],
  } = useContext(
    ShoppingCartContext
  );

  const {
    isAuth,
    user,
  } = useContext(
    AuthContext
  );

  const {
    items: favoriteItems = [],
  } = useContext(
    FavoriteContext
  );

  // ==========================================
  // PRODUCTS
  // ==========================================

  const productData =
    useProducts();

  /*
   * Extra bescherming:
   * products kan nooit undefined
   * zijn binnen deze component.
   */

  const products = Array.isArray(
    productData?.products
  )
    ? productData.products
    : [];

  const categories =
    Array.isArray(
      productData?.categories
    )
      ? productData.categories
      : [
          "Alle categorieën",
        ];

  const loading =
    productData?.loading ??
    false;

  const error =
    productData?.error ?? "";

  const demoMode =
    productData?.demoMode ??
    false;

  const handleLogout =
    useHandleLogout();

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredItems =
    useMemo(() => {
      /*
       * products is hier gegarandeerd
       * een array.
       */

      return products.filter(
        (item) => {
          const search =
            query
              .toLowerCase()
              .trim();

          const title =
            item.title
              ?.toLowerCase() ||
            "";

          const description =
            item.description
              ?.toLowerCase() ||
            "";

          const category =
            item.category
              ?.toLowerCase() ||
            "";

          const matchesSearch =
            title.includes(search) ||
            description.includes(
              search
            ) ||
            category.includes(
              search
            );

          const matchesCategory =
            selectedCategory ===
              "" ||
            selectedCategory ===
              "Alle categorieën" ||
            category ===
              selectedCategory.toLowerCase();

          return (
            matchesSearch &&
            matchesCategory
          );
        }
      );
    }, [
      products,
      query,
      selectedCategory,
    ]);

  // ==========================================
  // SEARCH
  // ==========================================

  const handleSearch = (
    value
  ) => {
    setQuery(value);

    const category =
      selectedCategory &&
      selectedCategory !==
        "Alle categorieën"
        ? `&category=${encodeURIComponent(
            selectedCategory
          )}`
        : "";

    navigate(
      `/Shop?query=${encodeURIComponent(
        value
      )}${category}`
    );
  };

  // ==========================================
  // CATEGORY
  // ==========================================

  const handleCategoryChange =
    (value) => {
      setSelectedCategory(
        value
      );

      if (
        value === "" ||
        value ===
          "Alle categorieën"
      ) {
        navigate(
          `/Shop?query=${encodeURIComponent(
            query
          )}`
        );
      } else {
        navigate(
          `/Shop?query=${encodeURIComponent(
            query
          )}&category=${encodeURIComponent(
            value
          )}`
        );
      }
    };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div
      className={
        styles.shopOuterContainer
      }
    >
      {/* ======================================
          TITLE
      ====================================== */}

      <div
        className={
          styles.shop
        }
      >
        <h1>
          Bakkery.
        </h1>
      </div>

      {/* ======================================
          HEADER
      ====================================== */}

      <section
        className={
          styles.shopOuter
        }
      >
        <header
          className={
            styles.shopHeader
          }
        >
          <nav
            className={
              styles.navbarFourShop
            }
          >
            <ul
              className={
                styles.navLinksShop
              }
            >
              <li>
                <NavLink to="/">
                  Home
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* SEARCH */}

          <div
            className={
              styles.searchbar
            }
          >
            <SearchBar
              inputValue={query}
              inputCallback={
                handleSearch
              }
              selectedCategory={
                selectedCategory
              }
              onCategoryChange={
                handleCategoryChange
              }
              categories={
                categories
              }
              showCategories={
                true
              }
            />
          </div>

          {/* ICONS */}

          <div
            className={
              styles.iconBar
            }
          >
            {/* FAVORITES */}

            <div
              className={
                styles.iconItem
              }
              onClick={() =>
                navigate(
                  "/favorietenpage"
                )
              }
              title="Favorieten"
            >
              <FontAwesomeIcon
                icon={faHeart}
              />

              {favoriteItems.length >
                0 && (
                <span
                  className={
                    styles.iconCount
                  }
                >
                  {
                    favoriteItems.length
                  }
                </span>
              )}
            </div>

            {/* CART */}

            <div
              className={
                styles.iconItem
              }
              onClick={() =>
                navigate(
                  "/cart"
                )
              }
              title="Winkelwagen"
            >
              <FontAwesomeIcon
                icon={
                  faShoppingCart
                }
              />

              {items.length >
                0 && (
                <span
                  className={
                    styles.iconCount
                  }
                >
                  {items.length}
                </span>
              )}
            </div>

            {/* AUTH */}

            {isAuth ? (
              <>
                <div
                  className={
                    styles.iconItem
                  }
                  title={`Ingelogd als ${
                    user?.username ||
                    user?.email ||
                    "Onbekend"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={
                      faUser
                    }
                  />
                </div>

                <div
                  className={
                    styles.iconItem
                  }
                  onClick={
                    handleLogout
                  }
                  title="Log uit"
                >
                  <FontAwesomeIcon
                    icon={
                      faSignOutAlt
                    }
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className={
                    styles.iconItem
                  }
                  onClick={() =>
                    navigate(
                      "/signup"
                    )
                  }
                  title="Sign Up"
                >
                  <FontAwesomeIcon
                    icon={
                      faUser
                    }
                  />
                </div>

                <div
                  className={
                    styles.iconItem
                  }
                  onClick={() =>
                    navigate(
                      "/signin"
                    )
                  }
                  title="Login"
                >
                  <FontAwesomeIcon
                    icon={
                      faUser
                    }
                  />
                </div>
              </>
            )}
          </div>
        </header>
      </section>

      {/* ======================================
          PRODUCTS
      ====================================== */}

      <main
        className={
          styles.shopProducts
        }
      >
        {/* LOADING */}

        {loading && (
          <p>
            Loading...
          </p>
        )}

        {/* DEMO MODE */}

        {demoMode &&
          !loading && (
            <div
              className={
                styles.demoMessage
              }
            >
              Demo mode — backend
              unavailable. Showing
              local products.
            </div>
          )}

        {/* ERROR */}

        {error &&
          !loading && (
            <p>
              {error}
            </p>
          )}

        {/* NO RESULTS */}

        {!loading &&
          !error &&
          filteredItems.length ===
            0 && (
            <p>
              No search results.
            </p>
          )}

        {/* PRODUCT LIST */}

        {!loading &&
          !error &&
          filteredItems.length >
            0 && (
            <section
              className={
                styles.productList
              }
            >
              {filteredItems.map(
                (item) => (
                  <Shopcard
                    key={item.id}
                    onClick={() =>
                      navigate(
                        `/detailpagina/${item.id}`
                      )
                    }
                    label={
                      item.title
                    }
                    text={
                      item.description
                    }
                    image={
                      item.image
                    }
                    price={
                      item.price
                    }
                    rating={
                      item.rating
                        ?.rate ??
                      item.rating_rate ??
                      0
                    }
                  />
                )
              )}
            </section>
          )}
      </main>

      {/* ======================================
          FOOTER
      ====================================== */}

      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
}

export default ShopPagina;