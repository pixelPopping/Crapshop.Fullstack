import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import useProducts from "../../hooks/useProducts";
import useProduct from "../../hooks/useProduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShoppingCart,
  faUser,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import { ShoppingCartContext } from "../../context/ShoppingCartContext";
import { AuthContext } from "../../context/AuthContext";
import { FavoriteContext } from "../../context/FavoriteContext";
import useHandleLogout from "../../helpers/useHandleLogout";
import SearchBar from "../../components/searchFilter/SearchBar";
import Hamburger from "../../components/hamburgermenu/Hamburger";
import ShowModal from "../../components/modal/ShowModal";
import DetailCard from "../../components/detailcard/DetailCard";
import ShoppingCart from "../../components/shoppingcart/ShoppingCart";
import FooterLayout from "../../components/footer/FooterLayout";
import filterProducts from "../../helpers/filteredProducts.jsx";
import styles from "./DetailPagina.module.css";

function DetailPagina() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { cart, reSet, items } = useContext(ShoppingCartContext);
  const { isAuth, user } = useContext(AuthContext);
  const { items: favoriteItems } = useContext(FavoriteContext);
  const handleLogout = useHandleLogout();

  const params = new URLSearchParams(location.search);
  const zoekQuery = params.get("query")?.toLowerCase() || "";

  const [query, setQuery] = useState(zoekQuery);
  const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
  const [showModal, setShowModal] = useState(zoekQuery.length > 0);
  const [menuOpen, setMenuOpen] = useState(false);

  const { products, categories } = useProducts();
  const { product, loading, error } = useProduct(id);
  const filteredProducts = filterProducts(products, query, selectedCategory);

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

  return (
    <main className={styles.mainOuter}>
      <div className={styles.layout}>
        <header className={styles.shopHeaderDetail}>
          <div className={styles.iconBar}>
            <div
              className={styles.iconItemDetail}
              onClick={() => navigate("/favorietenpage")}
              title="Favorieten"
            >
              <FontAwesomeIcon icon={faHeart} />
              {favoriteItems.length > 0 && (
                <span className={styles.iconCount}>{favoriteItems.length}</span>
              )}
            </div>
            <div
              className={styles.winkelwagen}
              onClick={() => navigate("/cart")}
              title="Winkelwagen"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {items.length > 0 && (
                <span className={styles.iconCount}>{items.length}</span>
              )}
            </div>

            {isAuth ? (
              <>
                <div
                  className={styles.iconItemDetail}
                  title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div
                  className={styles.iconItemDetail}
                  onClick={handleLogout}
                  title="Log uit"
                >
                  <FontAwesomeIcon icon={faSignOutAlt} />
                </div>
              </>
            ) : (
              <>
                <div
                  className={styles.iconItemDetail}
                  onClick={() => navigate("/signup")}
                  title="Sign Up"
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div
                  className={styles.iconItemDetail}
                  onClick={() => navigate("/signin")}
                  title="Login"
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
              </>
            )}
          </div>
          <nav className={styles.navbarFourDetail}>
            <ul className={`${styles.navLinks} ${ menuOpen ? styles.active : ""
  }`}
>
              <li>
                <NavLink to="/products/Men">Men</NavLink>
              </li>
              <li>
                <NavLink to="/products/electronic,s">Electronic,s</NavLink>
              </li>
              <li>
                <NavLink to="/Shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <div className={styles.searchDetailContainer}>
          <SearchBar
            inputValue={query}
            inputCallback={(value) => {
              setQuery(value);
              navigate(`?query=${encodeURIComponent(value)}`);
              setShowModal(true);
            }}
            selectedCategory={selectedCategory}
            onCategoryChange={(value) => {
              setSelectedCategory(value);
              setShowModal(true);
              if (value !== "All category") {
                navigate(
                  `?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`,
                );
              }
            }}
            categories={categories}
            showCategories={false}
          />
          <Hamburger
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            categories={categories}
          />
        </div>

        {showModal && (
          <ShowModal
            query={query}
            selectedCategory={selectedCategory}
            filteredProducts={filteredProducts}
            setShowModal={setShowModal}
          />
        )}
        <section className={styles.innerContainerDetail}>
          {loading ? (
            <p>Product wordt geladen...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <pre>{JSON.stringify(product, null, 2)}</pre>

              {product && (
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
              )}

              <div className={styles.viewAllProducts}>
                <li>
                  <NavLink
                    to="/Shop"
                    className={({ isActive }) =>
                      isActive ? "active-link" : "default-link"
                    }
                  >
                    View All
                  </NavLink>
                </li>
              </div>
            </>
          )}
        </section>

        <aside className={styles.shoppingCartContainer}>
          {!loading && !error && product && (
            <ShoppingCart
              product={product}
              resetButton={() => reSet()}
              cartItems={items}
            />
          )}
        </aside>
        <footer>
          <FooterLayout />
        </footer>
      </div>
    </main>
  );
}

export default DetailPagina;
