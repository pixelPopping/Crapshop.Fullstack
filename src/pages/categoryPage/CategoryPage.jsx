import React, { useEffect, useState, useContext, useRef } from "react";
import { useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHeart,
    faShoppingCart,
    faSignOutAlt,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import { AuthContext } from "../../context/AuthContext.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import CategoryCard from "../../components/categoryCard/CategoryCard.jsx";
import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import Hamburger from "../../components/hamburgermenu/Hamburger.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import "./CategoryPage.css";

const CategoryPage = () => {
    const { category } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const { isAuth, user } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems } = useContext(FavoriteContext);

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(
        category || "All category"
    );
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState(["All category"]);

    const handleLogout = useHandleLogout();
    const filteredProductsList = filterProducts(
        allProducts,
        query,
        selectedCategory
    );

    const carouselRef = useRef();

    const scrollCarousel = (offset) => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
        }
    };

    useEffect(() => {
        async function GetCategory() {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setAllProducts(res.data);

                const filtered = res.data.filter((item) => item.category === category);
                setProducts(filtered);

                const cat = await axios.get(
                    "https://fakestoreapi.com/products/categories"
                );
                setCategories(["All category", ...cat.data]);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        }

        GetCategory();
    }, [category]);

    return (
        <div className="outer-category-page">
            <section className="inner-category-page">
                <nav className="navbar-four-category">
                    <ul className="nav-links4">
                        <li>
                            <NavLink to="/products/men's clothing">Men</NavLink>
                        </li>
                        <li>
                            <NavLink to="/products/women's clothing">Women</NavLink>
                        </li>
                        <li>
                            <NavLink to="/Shop">Shop</NavLink>
                        </li>
                        <li>
                            <NavLink to="/">Home</NavLink>
                        </li>
                    </ul>

                    <div className="search-hamburger-container">
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
                                if (value !== "Alle categorieën") {
                                    navigate(
                                        `?query=${encodeURIComponent(query)}&category=${encodeURIComponent(
                                            value
                                        )}`
                                    );
                                }
                            }}
                            categories={categories}
                            showCategories={false}
                        />
                    </div>

                    <section className="burger">
                        <Hamburger
                            menuOpen={menuOpen}
                            setMenuOpen={setMenuOpen}
                            categories={categories}
                        />
                    </section>

                    <div className="icon-bar">
                        <div
                            className="icon-item"
                            onClick={() => navigate("/favorietenpage")}
                            title="Favorieten"
                        >
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && (
                                <span className="icon-count">{favoriteItems.length}</span>
                            )}
                        </div>

                        <div
                            className="icon-item"
                            onClick={() => navigate("/cart")}
                            title="Winkelwagen"
                        >
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && (
                                <span className="icon-count">{cartItems.length}</span>
                            )}
                        </div>

                        {isAuth ? (
                            <>
                                <div
                                    className="icon-item"
                                    title={`Ingelogd als ${user?.username ?? "Onbekend"}`}
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div
                                    className="icon-item"
                                    onClick={handleLogout}
                                    title="Log uit"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} />
                                </div>
                            </>
                        ) : (
                            <>
                                <div
                                    className="icon-item"
                                    onClick={() => navigate("/signup")}
                                    title="Sign Up"
                                >
                                    <FontAwesomeIcon icon={faUser} />
                                </div>
                                <div
                                    className="icon-item"
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
                        filteredProducts={filteredProductsList}
                        setShowModal={setShowModal}
                    />
                )}

                <section>
                    <article>
                        <div className="empty-box"></div>
                    </article>
                </section>

                <section>
                    <article>
                        <div className="empty-box2">
                            <div className="header-content">
                                <h2>{category}</h2>
                            </div>
                        </div>
                    </article>
                </section>

                <section className="main-content">
                    {loading ? (
                        <p>Load Products...</p>
                    ) : (
                        <div className="carousel-wrapper">
                            <button className="arrow left" onClick={() => scrollCarousel(-300)}>
                                &#8592;
                            </button>
                            <div className="product-carousel" ref={carouselRef}>
                                {products.map((product) => (
                                    <CategoryCard
                                        key={product.id}
                                        product={product}
                                        image={product.image}
                                        label={product.title}
                                        text={`Price: €${product.price}`}
                                        rating={product.rating.rate}
                                        onClick={() => navigate(`/detailpagina/${product.id}`)}
                                    />
                                ))}
                            </div>
                            <button className="arrow right" onClick={() => scrollCarousel(300)}>
                                &#8594;
                            </button>
                        </div>
                    )}
                </section>

                <footer>
                    <FooterLayout />
                </footer>
            </section>
        </div>
    );
};

export default CategoryPage;


















