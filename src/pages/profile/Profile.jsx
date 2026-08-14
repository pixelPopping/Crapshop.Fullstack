import axiosClient from "../../api/axiosClient";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faUser,
  faSignOutAlt,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { AuthContext } from "../../context/AuthContext";
import { FavoriteContext } from "../../context/FavoriteContext";
import useHandleLogout from "../../helpers/useHandleLogout";
import SearchBar from "../../components/searchFilter/SearchBar";
import Hamburger from "../../components/hamburgermenu/Hamburger";
import ShowModal from "../../components/modal/ShowModal";
import filterProducts from "../../helpers/filteredProducts.jsx";
import styles from  "./Profile.module.css";

function ProfilePagina() {
  const navigate = useNavigate();
  const location = useLocation();

  const { items: cartItems } = useContext(ShoppingCartContext);
  const { isAuth, user, token } = useContext(AuthContext);
  const { items: favoriteItems } = useContext(FavoriteContext);
  const handleLogout = useHandleLogout();

  const params = new URLSearchParams(location.search);
  const zoekQuery = params.get("query")?.toLowerCase() || "";

  const [apiData, setApiData] = useState(null);
  const [query, setQuery] = useState(zoekQuery);
  const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
  const [categories, setCategories] = useState(["Alle categorieën"]);
  const [showModal, setShowModal] = useState(zoekQuery.length > 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [allProducts, setAllProducts] = useState([]);

  const filteredProducts = filterProducts(allProducts, query, selectedCategory);

 useEffect(() => {
  async function fetchProfileData() {
    try {
      setLoading(true);
      setError(false);

      const response = await axiosClient.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setApiData(response.data);
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  if (isAuth && token) {
    fetchProfileData();
  } else {
    setLoading(false);
  }
}, [isAuth, token]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        !e.target.closest(".hamburger-menu") &&
        !e.target.closest(".hamburger")
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isAuth) return <p>You need to be logged in to see this page.</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>There is a error with Fetching the API data.</p>;

  return (
    <div className={styles.profileOuter}>
      <div className={styles.holygrail}>
        <header className={styles.holygrailHeader}>
          <div className={styles.headerRight}>
            <Hamburger
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              categories={categories}
            />
            <div
              className={styles.iconItem}
              onClick={() => navigate("/favorietenpage")}
            >
              <FontAwesomeIcon icon={faHeart} />
              {favoriteItems.length > 0 && (
                <span className={styles.iconCount}>{favoriteItems.length}</span>
              )}
            </div>
            <div className={styles.iconItem} onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItems.length > 0 && (
                <span className={styles.iconCount}>{cartItems.length}</span>
              )}
            </div>
            <div className={styles.iconItem} title={`Ingelogd als ${user?.email}`}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className={styles.iconItem} onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </div>
          <div className={styles.sidebarRight}>
            <SearchBar
              inputValue={query}
              inputCallback={(value) => {
                setQuery(value);
                setShowModal(true);
              }}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              showCategories={false}
            />
          </div>
        </header>

        <nav className={styles.holygrailSidebar}>
          <ul>
            <li>
              <NavLink to="/Shop">Shop</NavLink>
            </li>
            <li>
              <NavLink to="/recencies">Recencies</NavLink>
            </li>
            <li>
              <NavLink to="/favorietenpage">Favorite,s</NavLink>
            </li>
          </ul>
        </nav>

        <main className={styles.holygrailContent}>
          {showModal && (
            <ShowModal
              query={query}
              selectedCategory={selectedCategory}
              filteredProducts={filteredProducts}
              setShowModal={setShowModal}
            />
          )}

          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <h1>Profile</h1>
            </div>
            <div>
              <h2>Files From token</h2>
              <p>
                <strong>ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            <div>
              <h2>Extra Files From API</h2>
              {apiData ? (
                <div>
                  <p>
                    <strong>Naam:</strong> {apiData.name || "Onbekend"}
                  </p>
                  <p>
                    <strong>Email:</strong> {apiData.email || "Onbekend"}
                  </p>
                  {apiData.roles && (
                    <p>
                      <strong>Rollen:</strong> {apiData.roles.join(", ")}
                    </p>
                  )}
                </div>
              ) : (
                <p>No extra File Available.</p>
              )}
            </div>
          </div>
        </main>

        <footer className={styles.holygrailFooter}>
          <div className={styles.layoutFooter}>
            <li>
              <NavLink to="/profile">Profile</NavLink>
            </li>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default ProfilePagina;
