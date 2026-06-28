///stap 1 simpele zoekbalk maken
///stap 2 alle producten ophalen uit de shop.json
///stap 3 state aanmaken om de zoekresultaten op te slaan en een controlt component te maken
// stap 4 querys maken voor zoeken op titel
///stap 4 filter methode gebruiken om zoekresultaten te filteren
///stap 5 state verplaatsen naar app.jsx zodat bij alle componenten de zoekbalk functioneel is
import React from "react";
import "./SearchBar.css";

const SearchBar = ({
                      inputValue,
                      inputCallback,
                      selectedCategory,
                      onCategoryChange,
                      categories,
                      showCategories
                  }) => {
    return (
        <div className="searchBarContainer">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => inputCallback(e.target.value)}
                placeholder="Search on product..."
                className="searchInput"
            />

            {showCategories && (
                <select
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    className="categorySelect"
                >
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default SearchBar;




