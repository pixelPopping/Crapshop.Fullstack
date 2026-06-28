import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShoppingCart, faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";

import SearchBar from "../../components/searchFilter/SearchBar.jsx";
import SignUpForm from "../../components/signUpForm/SignUpForm.jsx";
import ShowModal from "../../components/modal/ShowModal.jsx";
import FooterLayout from "../../components/Footer/FooterLayout.jsx";

import { AuthContext } from "../../context/AuthContext.jsx";
import { ShoppingCartContext } from "../../context/ShoppingCartContext.jsx";
import { FavoriteContext } from "../../context/FavoriteContext.jsx";

import useHandleLogout from "../../helpers/UseHandleLogout.jsx";
import filterProducts from "../../helpers/filteredProducts.jsx";

import "./SignUp.css";

function SignUp() {
    const navigate = useNavigate();
    const { isAuth, user } = useContext(AuthContext);
    const { items: cartItems } = useContext(ShoppingCartContext);
    const { items: favoriteItems } = useContext(FavoriteContext);

    const params = new URLSearchParams(location.search);
    const zoekQuery = params.get("query")?.toLowerCase() || "";

    const [query, setQuery] = useState(zoekQuery);
    const [selectedCategory, setSelectedCategory] = useState("Alle categorieën");
    const [showModal, setShowModal] = useState(zoekQuery.length > 0);
    const [allProducts, setAllProducts] = useState([]);
    const [categories, setCategories] = useState(["Alle categorieën"]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleLogout = useHandleLogout();
    const filteredProducts = filterProducts(allProducts, query, selectedCategory);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await axios.get("https://fakestoreapi.com/products");
                setAllProducts(res.data);
                const cat = await axios.get("https://fakestoreapi.com/products/categories");
                setCategories(["Alle categorieën", ...cat.data]);
            } catch (e) {
                console.error(e);
            }
        }
        fetchProducts();
    }, []);

 const handleFormSubmit = async (data) => {
    setLoading(true);
    setErrorMessage("");

    const body = {
        username: data.username,
        lastname: data.lastname,
        gender: data.gender,
        email: data.email,
        password: data.password,
        postalcode: data.postalcode,
        unit: data.unit,
        homeadress: data.homeadress,
        city: data.city,
        phonenumber: data.phonenumber,
        dateOfBirth: data.date,
        roles: ["user"],
        cart: [],
    };

    const headers = {
        accept: "application/json",
        "content-type": "application/json",
        "novi-education-project-id": "b72992a3-9bd0-4e8c-84d5-0e24aff4e81b",
    };

    console.log("==================================");
    console.log("DEBUG START");
    console.log("==================================");

    console.log("API URL:", "/api/users");

    console.log("HEADERS:");
    console.table(headers);

    console.log("BODY:");
    console.table(body);

    console.log("RAW BODY:");
    console.log(JSON.stringify(body, null, 2));

    try {
        const response = await axios.post("/api/users", body, {
            headers,
        });

        console.log("==================================");
        console.log("SUCCESS");
        console.log("==================================");

        console.log("Status:", response.status);
        console.log("Status Text:", response.statusText);
        console.log("Response:");
        console.log(response.data);

        navigate("/signin");

    } catch (error) {

        console.log("==================================");
        console.log("ERROR");
        console.log("==================================");

        console.log("Message:");
        console.log(error.message);

        console.log("Status:");
        console.log(error.response?.status);

        console.log("Status Text:");
        console.log(error.response?.statusText);

        console.log("Response Data:");
        console.log(error.response?.data);

        console.log("Response Headers:");
        console.log(error.response?.headers);

        console.log("Request Config:");
        console.log(error.config);

        console.log("Complete Error:");
        console.dir(error);

        if (error.response) {
            console.log("Axios Response");
            console.dir(error.response);
        }

        if (error.request) {
            console.log("Axios Request");
            console.dir(error.request);
        }

        setErrorMessage("Registratie mislukt. Zie console voor details.");

    } finally {
        setLoading(false);

        console.log("==================================");
        console.log("DEBUG EINDE");
        console.log("==================================");
    }
};

    return (
        <div className="layout-signup">
            <nav className="navbar-four-signup">
                <ul className="nav-links4">
                    <li><NavLink to="/products/men's clothing">Men</NavLink></li>
                    <li><NavLink to="/products/women's clothing">Women</NavLink></li>
                    <li><NavLink to="/Shop">Shop</NavLink></li>
                    <li><NavLink to="/">Home</NavLink></li>
                </ul>

                <SearchBar
                    type="text"
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
                            navigate(`?query=${encodeURIComponent(query)}&category=${encodeURIComponent(value)}`);
                        }
                    }}
                    categories={["Alle categorieën", ...categories]}
                />

                <div className="button-container-signup">
                    {isAuth ? (
                        <>
                            <div className="icon-item" onClick={handleLogout} title="Log uit">
                                <FontAwesomeIcon icon={faSignOutAlt} />
                            </div>
                            <div className="icon-item" title={`Ingelogd als ${user?.username ?? "Onbekend"}`}>
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="icon-item" onClick={() => navigate("/signup")} title="Sign Up">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div className="icon-item" onClick={() => navigate("/signin")} title="Login">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                        </>
                    )}

                    <div className="icon-item" onClick={() => navigate("/cart")} title="Winkelwagen">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faShoppingCart} />
                            {cartItems.length > 0 && <span className="icon-count">{cartItems.length}</span>}
                        </div>
                    </div>

                    <div className="icon-item" onClick={() => navigate("/favorietenpage")} title="Favorieten">
                        <div className="icon-wrapper">
                            <FontAwesomeIcon icon={faHeart} />
                            {favoriteItems.length > 0 && <span className="icon-count">{favoriteItems.length}</span>}
                        </div>
                    </div>
                </div>
            </nav>

            <main>
                <section>
                    {showModal && (
                        <ShowModal
                            query={query}
                            selectedCategory={selectedCategory}
                            filteredProducts={filteredProducts}
                            setShowModal={setShowModal}
                        />
                    )}
                </section>

                <SignUpForm
                    onSubmit={handleFormSubmit}
                    loading={loading}
                    errorMessage={errorMessage}
                />
            </main>

            <footer>
                <FooterLayout />
            </footer>
        </div>
    );
}

export default SignUp;













