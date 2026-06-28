import "./RecensieItem.css";

function RecensieItem({ label, text, likes, onLike }) {
    return (
        <section className="layout-item">
            <div className="card-recencies">
                <p>
                    <strong>{label}</strong>: {text}
                </p>
                <p className="likes">Likes: {likes}</p>
                <button className="like-button" onClick={onLike}>
                    Like
                </button>
                <div className="visual"></div>
            </div>
        </section>
    );
}

export default RecensieItem;


