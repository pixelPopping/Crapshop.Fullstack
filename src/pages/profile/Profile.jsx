import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
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
import "./Profile.css";

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
    async function fetchProductsAndCategories() {
      try {
        setLoading(true);
        const [productsRes, categoriesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/products"),
          axios.get("https://localhost:5000/products/categories"),
        ]);
        setAllProducts(productsRes.data);
        setCategories([
          "Alle categorieën",
          ...categoriesRes.data.map((category) => category.name),
        ]);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchProductsAndCategories();
  }, []);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        if (!user?.id) throw new Error("Geen gebruikers-ID beschikbaar");
        setLoading(true);
        setError(false);

        const response = await axios.get(
          `https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${user.id}`,
          {
            headers: {
              accept: "application/json",
              "novi-education-project-id":
                "b72992a3-9bd0-4e8c-84d5-0e24aff4e81b",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setApiData(response.data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    if (isAuth && token) fetchProfileData();
    else setLoading(false);
  }, [isAuth, token, user?.id]);

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
    <div className="profile-outer">
      <div className="holygrail">
        <header className="holygrail-header">
          <div className="header-right">
            <Hamburger
              menuOpen={menuOpen}
              setMenuOpen={setMenuOpen}
              categories={categories}
            />
            <div
              className="icon-item"
              onClick={() => navigate("/favorietenpage")}
            >
              <FontAwesomeIcon icon={faHeart} />
              {favoriteItems.length > 0 && (
                <span className="icon-count">{favoriteItems.length}</span>
              )}
            </div>
            <div className="icon-item" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart} />
              {cartItems.length > 0 && (
                <span className="icon-count">{cartItems.length}</span>
              )}
            </div>
            <div className="icon-item" title={`Ingelogd als ${user?.email}`}>
              <FontAwesomeIcon icon={faUser} />
            </div>
            <div className="icon-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </div>
          </div>
          <div className="sidebar-right">
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

        <nav className="holygrail-sidebar">
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

        <main className="holygrail-content">
          {showModal && (
            <ShowModal
              query={query}
              selectedCategory={selectedCategory}
              filteredProducts={filteredProducts}
              setShowModal={setShowModal}
            />
          )}

          <div className="profile-container">
            <div className="profile-header">
              <h1>Profile</h1>
            </div>
            <div className="profile-section">
              <h2>Files From token</h2>
              <p>
                <strong>ID:</strong> {user?.id}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
            </div>
            <div className="profile-section">
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

        <footer className="holygrail-footer">
          <div className="layout-footer">
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
