import { NavLink } from "react-router-dom";
import "./ShowModal.css";

function ShowModal({
  query,
  selectedCategory,
  filteredProducts = [],
  setShowModal,
}) {
  return (
    <div className="search-modal">
      <div className="modal-content">
        <h3>
          Zoekresultaten voor: <strong>{query || selectedCategory}</strong>
        </h3>

        <button onClick={() => setShowModal(false)}>Sluiten</button>

        <ul>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <li key={product.id}>
                <NavLink
                  to={`/detailpagina/${product.id}`}
                  onClick={() => setShowModal(false)}
                >
                  {product.title}
                </NavLink>
              </li>
            ))
          ) : (
            <li>Geen resultaten gevonden.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ShowModal;
