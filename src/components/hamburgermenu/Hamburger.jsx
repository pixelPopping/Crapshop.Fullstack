import React from "react";
import { useNavigate } from "react-router-dom";
import "./Hamburger.css";

export default function Hamburger({ menuOpen, setMenuOpen, categories }) {
    const navigate = useNavigate();

    return (
        <div className="hamburger-wrapper">
            <div
                className={`hamburger ${menuOpen ? "open" : ""}`}
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {menuOpen && (
                <div className="hamburger-menu">
                    {categories.map((cat, index) => (
                        <button
                            key={index}
                            className="hamburger-link"
                            onClick={() => {
                                const encodedCategory = encodeURIComponent(cat.toLowerCase());
                                navigate(`/products/${encodedCategory}`);
                                setMenuOpen(false);
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

