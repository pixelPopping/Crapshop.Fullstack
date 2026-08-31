import axiosClient from "../../api/axiosClient";

import {
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

import {
  ShoppingCartContext,
} from "../../context/ShoppingCartContext";

import {
  AuthContext,
} from "../../context/AuthContext";

import {
  FavoriteContext,
} from "../../context/FavoriteContext";

import SearchBar from "../../components/searchFilter/SearchBar";
import Hamburger from "../../components/hamburgermenu/Hamburger";
import ShowModal from "../../components/modal/ShowModal";

import filterProducts from "../../helpers/filteredProducts.jsx";
import useProducts from "../../hooks/useProducts";
import useHandleLogout from "../../helpers/UseHandleLogout";

import styles from "./Profile.module.css";

function ProfilePagina() {
  const navigate = useNavigate();
  const location = useLocation();

  // ==========================================
  // CONTEXT
  // ==========================================

  const {
    items: cartItems = [],
  } = useContext(
    ShoppingCartContext
  );

  const {
    isAuth,
    user,
    token,
    isDemo,
  } = useContext(AuthContext);

  const {
    items: favoriteItems = [],
  } = useContext(
    FavoriteContext
  );

  const handleLogout =
    useHandleLogout();

  // ==========================================
  // PRODUCTS
  // ==========================================

  const {
    products = [],
    categories = [],
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  // ==========================================
  // URL
  // ==========================================

  const params =
    new URLSearchParams(
      location.search
    );

  const zoekQuery =
    params
      .get("query")
      ?.toLowerCase() || "";

  // ==========================================
  // STATE
  // ==========================================

  const [apiData, setApiData] =
    useState(null);

  const [query, setQuery] =
    useState(zoekQuery);

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState(
    "Alle categorieën"
  );

  const [showModal, setShowModal] =
    useState(
      zoekQuery.length > 0
    );

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(false);

  // ==========================================
  // FILTER PRODUCTS
  // ==========================================

  const filteredProducts =
    filterProducts(
      products,
      query,
      selectedCategory
    );

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    async function fetchProfileData() {
      // Geen gebruiker
      if (!isAuth || !user) {
        setLoading(false);
        return;
      }

      // ========================================
      // DEMO USER
      // ========================================

      if (isDemo) {
        setApiData({
          name:
            user.username ||
            "Demo User",

          email:
            user.email ||
            "demo@crapshop.demo",

          roles: [
            "demo",
          ],
        });

        setLoading(false);
        setError(false);

        return;
      }

      // ========================================
      // REAL BACKEND
      // ========================================

      try {
        setLoading(true);
        setError(false);

        const response =
          await axiosClient.get(
            "/auth/me",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          );

        setApiData(
          response.data
        );

      } catch (error) {
        console.warn(
          "Profile API unavailable."
        );

        // ======================================
        // PROFILE FALLBACK
        // ======================================

        setApiData({
          name:
            user.username ||
            user.name ||
            "Demo User",

          email:
            user.email ||
            "demo@crapshop.demo",

          roles:
            user.roles || [
              "demo",
            ],
        });

        setError(false);

      } finally {
        setLoading(false);
      }
    }

    fetchProfileData();
  }, [
    isAuth,
    user,
    token,
    isDemo,
  ]);

  // ==========================================
  // CLOSE HAMBURGER
  // ==========================================

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !e.target.closest(
          ".hamburger-menu"
        ) &&
        !e.target.closest(
          ".hamburger"
        )
      ) {
        setMenuOpen(false);
      }
    }

    document.addEventListener(
      "click",
      handleClickOutside
    );

    return () =>
      document.removeEventListener(
        "click",
        handleClickOutside
      );
  }, []);

  // ==========================================
  // NOT AUTHENTICATED
  // ==========================================

  if (!isAuth) {
    return (
      <p>
        You need to be logged in
        to see this page.
      </p>
    );
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <p>Loading...</p>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div
      className={
        styles.profileOuter
      }
    >
      <div
        className={
          styles.holygrail
        }
      >
        {/* ====================================
            HEADER
        ==================================== */}

        <header
          className={
            styles.holygrailHeader
          }
        >
          <div
            className={
              styles.headerRight
            }
          >
            <Hamburger
              menuOpen={menuOpen}
              setMenuOpen={
                setMenuOpen
              }
              categories={
                categories
              }
            />

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
                navigate("/cart")
              }
              title="Winkelwagen"
            >
              <FontAwesomeIcon
                icon={
                  faShoppingCart
                }
              />

              {cartItems.length >
                0 && (
                <span
                  className={
                    styles.iconCount
                  }
                >
                  {
                    cartItems.length
                  }
                </span>
              )}
            </div>

            {/* USER */}

            <div
              className={
                styles.iconItem
              }
              title={`Ingelogd als ${
                user?.email ||
                user?.username ||
                "Demo User"
              }`}
            >
              <FontAwesomeIcon
                icon={faUser}
              />
            </div>

            {/* LOGOUT */}

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
          </div>

          {/* SEARCH */}

          <div
            className={
              styles.sidebarRight
            }
          >
            <SearchBar
              inputValue={query}
              inputCallback={(
                value
              ) => {
                setQuery(value);
                setShowModal(
                  true
                );
              }}
              selectedCategory={
                selectedCategory
              }
              onCategoryChange={
                setSelectedCategory
              }
              categories={
                categories
              }
              showCategories={
                false
              }
            />
          </div>
        </header>

        {/* ====================================
            SIDEBAR
        ==================================== */}

        <nav
          className={
            styles.holygrailSidebar
          }
        >
          <ul>
            <li>
              <NavLink to="/Shop">
                Shop
              </NavLink>
            </li>

            <li>
              <NavLink to="/recencies">
                Recencies
              </NavLink>
            </li>

            <li>
              <NavLink to="/favorietenpage">
                Favorite,s
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* ====================================
            CONTENT
        ==================================== */}

        <main
          className={
            styles.holygrailContent
          }
        >
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

          <div
            className={
              styles.profileContainer
            }
          >
            {/* DEMO MESSAGE */}

            {isDemo && (
              <div
                className={
                  styles.demoMessage
                }
              >
                Demo mode — backend
                unavailable. You are
                viewing a demo profile.
              </div>
            )}

            <div
              className={
                styles.profileHeader
              }
            >
              <h1>
                Profile
              </h1>
            </div>

            {/* TOKEN / USER DATA */}

            <div>
              <h2>
                User Information
              </h2>

              <p>
                <strong>
                  ID:
                </strong>{" "}
                {user?.id ||
                  "Demo User"}
              </p>

              <p>
                <strong>
                  Email:
                </strong>{" "}
                {user?.email ||
                  "demo@crapshop.demo"}
              </p>

              <p>
                <strong>
                  Username:
                </strong>{" "}
                {user?.username ||
                  "Demo User"}
              </p>
            </div>

            {/* API DATA */}

            <div>
              <h2>
                Profile Data
              </h2>

              {apiData ? (
                <div>
                  <p>
                    <strong>
                      Naam:
                    </strong>{" "}
                    {apiData.name ||
                      "Onbekend"}
                  </p>

                  <p>
                    <strong>
                      Email:
                    </strong>{" "}
                    {apiData.email ||
                      "Onbekend"}
                  </p>

                  {apiData.roles && (
                    <p>
                      <strong>
                        Rollen:
                      </strong>{" "}
                      {Array.isArray(
                        apiData.roles
                      )
                        ? apiData.roles.join(
                            ", "
                          )
                        : apiData.roles}
                    </p>
                  )}
                </div>
              ) : (
                <p>
                  No extra profile
                  data available.
                </p>
              )}
            </div>
          </div>
        </main>

        {/* ====================================
            FOOTER
        ==================================== */}

        <footer
          className={
            styles.holygrailFooter
          }
        >
          <div
            className={
              styles.layoutFooter
            }
          >
            <li>
              <NavLink to="/profile">
                Profile
              </NavLink>
            </li>

            <li>
              <NavLink to="/cart">
                Cart
              </NavLink>
            </li>

            <li>
              <NavLink to="/">
                Home
              </NavLink>
            </li>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ProfilePagina;