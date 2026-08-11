import { useContext, useState, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faUser,
  faShoppingCart,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import useProducts from "../../hooks/useProducts";
import  styles from "./Shop.module.css";
import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import Shopcard from "../../components/shopcard/Shopcard.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { AuthContext } from "../../context/AuthContext/AuthContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import App from "../../App.jsx";

function ShopPagina() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate();
  const { items } = useContext(ShoppingCartContext);
  const { isAuth, user } = useContext(AuthContext);
  const { items: favoriteItems } = useContext(FavoriteContext);

  const { products, categories, loading, error } = useProducts();

  const handleLogout = useHandleLogout();

  const filteredItems = useMemo(
    () =>
      products.filter((item) => {
        const matchesSearch =
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          item.category.toLowerCase().includes(query.toLowerCase());

        const matchesCategory =
          selectedCategory === "" ||
          selectedCategory === "Alle categorieën" ||
          item.category === selectedCategory;

        return matchesSearch && matchesCategory;
      }),
    [products, query, selectedCategory],
  );

  return (
    <div className={styles.shopOuterContainer}>
      <div className={styles.shop}>
        <h1>Shop.</h1>
      </div>

      <section className={styles.shopOuter}>
        <header className={styles.shopHeader}>
          <nav className={styles.navbarFourShop}>
            <ul className={styles.navLinksShop}>
              <li>
                <NavLink to="/products/Men">Men</NavLink>
              </li>
              <li>
                <NavLink to="/products/electronics">electronics</NavLink>
              </li>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
            </ul>
          </nav>

          <div className={styles.searchbar}>
            <SearchBar
              inputValue={query}
              inputCallback={setQuery}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
            />
          </div>

          <div className={styles.iconBar}>
            <div
              className={styles.iconItem}
              onClick={() => navigate("/favorietenpage")}
              title="Favorieten"
            >
              <FontAwesomeIcon icon={faHeart} />
              {favoriteItems.length > 0 && (
                <span className="icon-count">{favoriteItems.length}</span>
              )}
            </div>

            <div
              className={styles.iconItem}
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
                  className={styles.iconItem}
                  title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
                >
                  <FontAwesomeIcon icon={faUser} />
                </div>
                <div
                  className={styles.iconItem}
                  onClick={handleLogout}
                  title="Log uit"
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
        </header>
      </section>

      <div className={styles.innerContainer}>
        <nav className={styles.sidebar}>
          <ul>
            <li>
              <NavLink to="/products/electronics">Electronics</NavLink>
            </li>
            <li>
              <NavLink to="/products/Men">Men</NavLink>
            </li>
          </ul>
        </nav>

        <main className={styles.shopProducts}>
          {loading && <p>Loading...</p>}
          {error && <p>There was an error fetching the products.</p>}
          {!loading && !error && filteredItems.length === 0 && (
            <p>No search results.</p>
          )}

          {!loading && !error && filteredItems.length > 0 && (
            <section className={styles.productList}>
              {filteredItems.map((item) => (
                <Shopcard
                  key={item.id}
                  onClick={() => navigate(`/detailpagina/${item.id}`)}
                  label={item.title}
                  text={item.description}
                  image={item.image}
                  price={item.price}
                  rating={item.rating_rate}
                />
              ))}
            </section>
          )}
        </main>
      </div>

      <footer>
        <FooterLayout />
      </footer>
    </div>
  );
}

export default ShopPagina;
