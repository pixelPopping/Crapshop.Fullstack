import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Hamburger.module.css";

export default function Hamburger({
  menuOpen,
  setMenuOpen,
  categories = [],
}) {
  const navigate = useNavigate();

  return (
    <div className={styles.hamburgerWrapper}>
      <button
        type="button"
        className={`${styles.hamburger} ${
          menuOpen ? styles.open : ""
        }`}
        onClick={(event) => {
          event.stopPropagation();
          setMenuOpen((previous) => !previous);
        }}
        aria-label="Open menu"
        aria-expanded={menuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {menuOpen && (
        <div
          className={styles.hamburgerMenu}
          onClick={(event) => event.stopPropagation()}
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={styles.hamburgerLink}
              onClick={() => {
                navigate(
                  `/Shop?category=${encodeURIComponent(category)}`
                );

                setMenuOpen(false);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}