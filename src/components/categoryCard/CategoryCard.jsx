import "./CategoryCard.css";

const CategoryCard = ({ image, label, text, price, rating, onClick }) => {
    return (
        <div className="category-container">
            <section onClick={onClick} className="category-card">
                <div className="category-card-content">
                    <img src={image} alt={label} className="category-card-image" />
                    <h3 className="category-card-label">{label}</h3>
                    <p className="category-card-text">{text}</p>
                    <p className="category-card-price">{price}</p>
                    <p className="category-card-rating">⭐ {rating}</p>
                </div>
            </section>
        </div>
    );
};

export default CategoryCard;





