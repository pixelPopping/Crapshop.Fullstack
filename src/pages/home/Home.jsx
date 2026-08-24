import { useContext, useState, useMemo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faSignOutAlt,
    faShoppingCart,
    faHeart,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Home.module.css";
import ClockTime from "../../components/digitaleClock/DIgitaleClock.jsx";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import Hamburger from "../../components/hamburgermenu/Hamburger.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";
import getItems from "../../helpers/getItems";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import Loading from "../../components/loading/Loading.jsx";
import ErrorMessage from "../../components/error/ErrorMessage.jsx";
import useProducts from "../../hooks/useProducts.js";



function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuth, user } = useContext(AuthContext);
  const { items: cartItems } = useContext(ShoppingCartContext);
  const { items: favoriteItems } = useContext(FavoriteContext);

  const params = new URLSearchParams(location.search);

  const [query, setQuery] = useState(
    params.get("query")?.toLowerCase() || ""
  );

  const [selectedCategory, setSelectedCategory] = useState(
    params.get("category") || "Alle categorieën"
  );

  const [showModal, setShowModal] = useState(query.length > 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { products, categories, loading, error } = useProducts();

  const filteredProducts = filterProducts(
    products,
    query,
    selectedCategory
  );

  const handleLogout = useHandleLogout();

  useMemo(() => getItems(), []);

  return (
  <div className={styles.outerContainerHome}>
    <div className={styles.navbarContainer}>
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li>
          <NavLink to="/shop">
            Bakkery
          </NavLink>
        </li>

        <li>
          <NavLink to="/recipi">
            Starter & Bread
          </NavLink>
        </li>

        <li>
          <NavLink to="/gallery">
            Gallery
          </NavLink>
        </li>
      </ul>

      <div className={styles.searchHamburgerContainer}>
        <div className={styles.searchField}>
          <SearchBar
            inputValue={query}
            inputCallback={(value) => {
              setQuery(value);
              setShowModal(true);
              navigate(`?query=${encodeURIComponent(value)}`);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={(value) => {
              setSelectedCategory(value);
              setShowModal(true);
            }}
            categories={categories}
            showCategories={false}
          />
        </div>

        <div className={styles.burger}>
          <Hamburger
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            categories={categories}
          />
        </div>
      </div>

      <div className={styles.iconBar}>
        <div
          className={styles.iconItem}
          onClick={() => navigate("/favorietenpage")}
          title="Favorieten"
        >
          <FontAwesomeIcon icon={faHeart} />

          {favoriteItems.length > 0 && (
            <span className={styles.iconCount}>
              {favoriteItems.length}
            </span>
          )}
        </div>

        <div
          className={styles.iconItem}
          onClick={() => navigate("/cart")}
          title="Shopping Cart"
        >
          <FontAwesomeIcon icon={faShoppingCart} />

          {cartItems.length > 0 && (
            <span className={styles.iconCount}>
              {cartItems.length}
            </span>
          )}
        </div>

        {isAuth ? (
          <>
            <div
              className={styles.iconItem}
              title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
            >
              <FontAwesomeIcon icon={faUser} />
            </div>

            <div
              className={styles.iconItem}
              onClick={handleLogout}
              title="Log Out"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
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
      </div>
    </nav>

        {showModal && (
      <ShowModal
        query={query}
        selectedCategory={selectedCategory}
        filteredProducts={filteredProducts}
        setShowModal={setShowModal}
      />
    )}
</div>
    {loading ? (
      <Loading />
    ) : error ? (
      <ErrorMessage message={error} />
    ) : (
      <main className={styles.main}>
        <div className={styles.headerContainer}>
          <header className={styles.header}>
            <h1>Stella@Home.</h1>
          </header>
        </div>

        <section className={styles.imageContainer}>
          <img className={styles.homeImage}
           src="/assets/home/Stella@home.jpg"
           alt="homeimage"
           />
        </section>

        <section className={styles.outerLinkContainer}>
          <div className={styles.linkContainer}>
            <ul>
              <li>
                <NavLink to="/profile">
                  Profile
                </NavLink>
              </li>

              <li>
                <NavLink to="/recencies">
                  Recensies
                </NavLink>
              </li>

              <li>
                <NavLink to="/favorietenpage">
                  Favorites
                </NavLink>
              </li>
            </ul>
          </div>
        </section>

        <section className={styles.outerSocialeContainer}>
          <div className={styles.socialeContainer}>
            <img className={styles.socialIcon}
              src="/icons/image13.png"
              alt="LinkedIn"
              onClick={() =>
                window.open(
                  "https://nl.linkedin.com/in/yorian-fransz-58111527b",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            />

            <img className={styles.socialIcon}
              src="/icons/image15.png"
              alt="GitHub"
              onClick={() =>
                window.open(
                  "https://github.com/PixelPopping",
                  "_blank",
                  "noopener,noreferrer"
                )
              }
            />

            <img className={styles.socialIcon}
              src="/icons/image12.png"
              alt="Mail"
              onClick={() => {
                window.location.href =
                  "mailto:sydney-cook@outlook.com";
              }}
            />
          </div>
        </section>
      </main>
    )}

        <footer className={styles.footerContainerHome}>
      <h2 className={styles.footerText}>
        PixelPopping@Productions
      </h2>
    </footer>
  </div>
);
}

export default Home;