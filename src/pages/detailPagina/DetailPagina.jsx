import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faUser, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
import './DetailPagina.css'

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [product, setProduct] = useState(null);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);
    const [menuOpen, setMenuOpen] = useState(false);

    const filteredProducts = filterProducts(allProducts, query, selectedCategory);

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true);
                const [productRes, allRes, catRes] = await Promise.all([
                    axios.get(`https://fakestoreapi.com/products/${id}`),
                    axios.get("https://fakestoreapi.com/products"),
                    axios.get("https://fakestoreapi.com/products/categories")
                ]);

                setProduct(productRes.data);
                setAllProducts(allRes.data);
                setCategories(["Alle categorieën", ...catRes.data]);
            } catch (e) {
                setError(true);
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    useEffect(() => {
        function handleClickOutside(e) {
            if (!e.target.closest(".hamburger-menu") && !e.target.closest(".hamburger")) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    return (
        <main className="main-outer">
            <div className="layout">
                <header className="shop-header-detail">
                    <div className="icon-bar">
                        <div
                            className="icon-item-detail"
                            onClick={() => navigate("/favorietenpage")}
                            title="Favorieten"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && (
                                <span className="icon-count">{favoriteItems.length}</span>
                            )}
                        </div>
                        <div
                            className="icon-item-detail"
                            onClick={() => navigate("/cart")}
                            title="Winkelwagen"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {items.length > 0 && (
                                <span className="icon-count">{items.length}</span>
                            )}
                        </div>

                        {isAuth ? (
                            <>
                                <div
                                    className="icon-item-detail"
                                    title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div
                                    className="icon-item-detail"
                                    onClick={handleLogout}
                                    title="Log uit"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className="icon-item-detail"
                                    onClick={() => navigate("/signup")}
                                    title="Sign Up"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div
                                    className="icon-item-detail"
                                    onClick={() => navigate("/signin")}
                                    title="Login"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                            </>
                        )}
                    </div>
                    <nav className="navbar-four-detail">
                        <ul className={`nav-links4 ${menuOpen ? "active" : ""}`}>
                            <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                            <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                            <li><NavLink to="/Shop">Shop</NavLink></li>
                            <li><NavLink to="/">Home</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <div className="search-detail-container">
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
                                    `?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`
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

                <section className="inner-container-detail">
                    {loading && <p>Its Loading...</p>}
                    {error && <p>There went something wrong with fetching the product.</p>}

                    {!loading && !error && product && (
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
                                    price: product.price
                                })
                            }
                        />
                    )}

                    <div className="view-all-products">
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
                </section>

                <aside className="shoppingcart-container">
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




























