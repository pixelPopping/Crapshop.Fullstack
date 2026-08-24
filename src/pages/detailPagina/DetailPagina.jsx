import { useContext, useState } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import useProducts from "../../hooks/useProducts";
import useProduct from "../../hooks/useProduct";

import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { AuthContext } from "../../context/AuthContext";
import { FavoriteContext } from "../../context/FavoriteContext";

import UseHandleLogout from "../../helpers/UseHandleLogout.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";

import SearchBar from "../../components/searchFilter/SearchBar";
import Hamburger from "../../components/hamburgermenu/Hamburger";
import ShowModal from "../../components/modal/ShowModal";
import DetailCard from "../../components/detailcard/DetailCard";
import ShoppingCart from "../../components/shoppingcart/ShoppingCart.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import styles from "./DetailPagina.module.css";

function DetailPagina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, reSet, items } =
    useContext(ShoppingCartContext);

  const { isAuth, user } =
    useContext(AuthContext);

  const { items: favoriteItems } =
    useContext(FavoriteContext);

  const handleLogout = UseHandleLogout();

  const params = new URLSearchParams(location.search);

  const zoekQuery =
    params.get("query")?.toLowerCase() || "";

  const [query, setQuery] = useState(zoekQuery);

  const [selectedCategory, setSelectedCategory] =
    useState("Alle categorieën");

  const [showModal, setShowModal] =
    useState(zoekQuery.length > 0);

  const [menuOpen, setMenuOpen] = useState(false);

  const {
    products,
    categories,
  } = useProducts();

  const {
    product,
    loading,
    error,
  } = useProduct(id);

  const filteredProducts = filterProducts(
    products,
    query,
    selectedCategory,
  );

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);

    if (value === "Alle categorieën") {
      navigate("/Shop");
    } else {
      navigate(
        `/Shop?category=${encodeURIComponent(value)}`,
      );
    }

    setMenuOpen(false);
  };

  return (
    <main className={styles.mainOuter}>
      <div className={styles.layout}>

        {/* HEADER */}
        <header className={styles.shopHeaderDetail}>

          {/* ICONS */}
          <div className={styles.iconBar}>

            {/* FAVORITES */}
            <div
              className={styles.iconItemDetail}
              onClick={() =>
                navigate("/favorietenpage")
              }
              title="Favorieten"
            >
              <FontAwesomeIcon icon={faHeart} />

              {favoriteItems.length > 0 && (
                <span className={styles.iconCount}>
                  {favoriteItems.length}
                </span>
              )}
            </div>

            {/* SHOPPING CART */}
            <div
              className={styles.winkelwagen}
              onClick={() => navigate("/cart")}
              title="Winkelwagen"
            >
              <FontAwesomeIcon
                icon={faShoppingCart}
              />

              {items.length > 0 && (
                <span className={styles.iconCount}>
                  {items.length}
                </span>
              )}
            </div>

            {/* AUTH */}
            {isAuth ? (
              <>
                <div
                  className={styles.iconItemDetail}
                  title={`Ingelogd als ${
                    user?.username ?? "Onbekend"
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faUser}
                  />
                </div>

                <div
                  className={styles.iconItemDetail}
                  onClick={handleLogout}
                  title="Log uit"
                >
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                  />
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.iconItemDetail}
                  onClick={() =>
                    navigate("/signup")
                  }
                  title="Sign Up"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                  />
                </div>

                <div
                  className={styles.iconItemDetail}
                  onClick={() =>
                    navigate("/signin")
                  }
                  title="Login"
                >
                  <FontAwesomeIcon
                    icon={faUser}
                  />
                </div>
              </>
            )}
          </div>

          {/* NAVIGATION */}
          <nav className={styles.navbarFourDetail}>
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
          </nav>

        </header>

        {/* SEARCH + HAMBURGER */}
        <div className={styles.searchDetailContainer}>

          <SearchBar
            inputValue={query}
            inputCallback={(value) => {
              setQuery(value);

              navigate(
                `?query=${encodeURIComponent(value)}`,
              );

              setShowModal(true);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            categories={categories}
            showCategories={false}
          />

          <Hamburger
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            categories={categories}
          />

        </div>

        {/* SEARCH MODAL */}
        {showModal && (
          <ShowModal
            query={query}
            selectedCategory={selectedCategory}
            filteredProducts={filteredProducts}
            setShowModal={setShowModal}
          />
        )}

        {/* PRODUCT DETAIL */}
        <section className={styles.innerContainerDetail}>

          {loading ? (
            <p>
              Product wordt geladen...
            </p>
          ) : error ? (
            <p>{error}</p>
          ) : product ? (
            <>
              <DetailCard
                key={product.id}
                id={product.id}
                label={product.title}
                text={product.description}
                price={product.price}
                image={product.image}
                cart={() =>
                  cart({
                    id: product.id,
                    title: product.title,
                    description: product.description,
                    image: product.image,
                    price: product.price,
                  })
                }
              />

              <div
                className={styles.viewAllProducts}
              >
                <NavLink to="/Shop">
                  View All
                </NavLink>
              </div>
            </>
          ) : (
            <p>
              Product niet gevonden.
            </p>
          )}

        </section>

        {/* SHOPPING CART */}
        <aside
          className={
            styles.shoppingCartContainer
          }
        >
          {!loading &&
            !error &&
            product && (
              <ShoppingCart
                product={product}
                resetButton={() => reSet()}
                cartItems={items}
              />
            )}
        </aside>

        {/* FOOTER */}
        <footer>
          <FooterLayout />
        </footer>

      </div>
    </main>
  );
}

export default DetailPagina;