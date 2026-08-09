import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hamburger.module.css";

export default function Hamburger({ menuOpen, setMenuOpen, categories }) {
  const navigate = useNavigate();

  return (
    <div className={styles.hamburgerWrapper}>
      <div
        className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {menuOpen && (
        <div className={styles.hamburgerMenu}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={styles.hamburgerLink}
              onClick={() => {
                const encodedCategory = encodeURIComponent(cat.name);
                navigate(`/products/${encodedCategory}`);
                setMenuOpen(false);
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
