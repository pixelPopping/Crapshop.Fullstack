import "./Gallery.css";
import FooterLayout from "../../components/Footer/FooterLayout";

function Gallery() {
    const images = [
        {
            src: "assets/gallery/broodenInKeuken.jpg",
            alt: "Brood in de keuken",
        },
        {
            src: "assets/gallery/croissantsOptafel.jpg",
            alt: "Croissants op tafel",
        },
        {
            src: "assets/gallery/koffieBroodjeRijzen.jpg",
            alt: "Koffie en broodjes rijzen",
        },
        {
            src: "assets/gallery/croissantsRijzen.jpg",
            alt: "Croissants rijzen",
        },
        {
            src: "assets/gallery/sourdoughKruis.jpg",
            alt: "Sourdough met kruis",
        },
    ];

    return (
        <>
        <main className="outermain">
        <section className="gallery">
            {images.map((image, index) => (
                <div className={`gallery-item item-${index + 1}`} key={image.src}>
                    <img src={image.src} alt={image.alt} />
                </div>
            ))}
        </section>
        </main>
        </>
    );
}

export default Gallery;