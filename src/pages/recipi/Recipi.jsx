import styles from "./Recipi.module.css";
import FooterLayout from "../../components/Footer/FooterLayout";

function Recipi() {
  const images = [
    {
      src: "/assets/prepare/actievestarter.jpg",
      alt: "Actieve starter",
    },
    {
      src: "/assets/prepare/1autolayse.jpg",
      alt: "Stap 1 autolyse",
    },
    {
      src: "/assets/prepare/2autolayse.jpg",
      alt: "Stap 2 autolyse",
    },
    {
      src: "/assets/prepare/3autolayse.jpg",
      alt: "Stap 3 autolyse",
    },
    {
      src: "/assets/prepare/bulkrise.jpg",
      alt: "Bulk rise",
    },
    {
      src: "/assets/prepare/opbollen.jpg",
      alt: "Opbollen",
    },
  ];

  return (
    <div className={styles.recipePage}>
      <header className={styles.header}>
        <h1>Recipe</h1>
        <p>From starter to sourdough</p>
      </header>

      <main className={styles.main}>
        <section className={styles.recipeGrid}>
          {images.map((image, index) => (
            <article
              className={`${styles.card} ${
                index === 0 ? styles.featured : ""
              }`}
              key={image.src}
            >
              <img src={image.src} alt={image.alt} />

              <div className={styles.cardContent}>
                <span>Step {index + 1}</span>
                <h2>{image.alt}</h2>
              </div>
            </article>
          ))}
        </section>
    
      </main>
      <h2>Ingredienten</h2>
         <ul>
          <li>500 gr bloem</li>
          <li>280 gr water</li>
          <li>100 gr actieve starter</li>
          <li>8 gr zout</li>
         </ul>
       <section className={styles.outerRecipi}>
            <article className={styles.textContainer}>
                <ol className={styles.orderdlist}>
                    <li><p>Voed je starter door 50gr water en 50gr bloem toe te voegen laat dit staan tot dubbel hoeveelheid.</p></li><br></br>
                    <li><p>Meng 500gr bloem en 280gr water in een grote kom dit is de autolayse, laat dit 1 uur staan de gluten activeren.</p></li><br></br>
                    <li><p>Weeg 100gr starter af en 8gr zout in de grote kom meng goed klont vrij en kneed 10min tot mooi deeg.</p></li><br></br>
                    <li><p>Maak elke 30min een stretch en fold door het deeg overelkaar heen te vouwen.</p></li><br></br>
                    <li><p>Verschoon je kom voeg scheutje olie toe smeer de randen in doe je deeg erin klaar voor 8 12 uur bulkrise.</p></li><br></br>
                    <li><p>De volgende dag bol je deeg op.</p></li><br></br>
                    <li><p>Verwarm de oven met dutchoven erin temperatuur 250 graden als de oven op temperatuur is plaats bakpapier in dutchoven bak de eerste 25min met de deksel erop verwijder deksel verlaag temperatuur naar 220 en bak 20 min zonder deksel.</p></li>
                </ol>
            </article>
        </section>
      <footer className={styles.footer}>
        <FooterLayout/>
      </footer>
    </div>
  );
}

export default Recipi;