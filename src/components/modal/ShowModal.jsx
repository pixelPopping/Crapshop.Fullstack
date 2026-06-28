import {NavLink} from "react-router-dom";
import './ShowModal.css'

function ShowModal({query, selectedCategory, filteredProducts, setShowModal}) {
    return(
            <div className="search-modal">
                <div className="modal-content">
                    <h3>Search Results For: <strong>{query || selectedCategory}</strong></h3>
                    <button onClick={() => setShowModal(false)}>Close</button>
                    <ul>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <li key={product.id}>
                                    <NavLink to={`/detailpagina/${product.id}`} onClick={() => setShowModal(false)}>
                                        {product.title}
                                    </NavLink>
                                </li>
                            ))
                        ) : (
                            <p>no results found.</p>
                        )}
                    </ul>
                </div>
            </div>
    )
}

export default ShowModal