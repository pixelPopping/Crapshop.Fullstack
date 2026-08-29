
import styles from "./Croissants.module.css";
import FooterLayout from "../../components/Footer/FooterLayout";

function Croissants() {
  const images = [
    {
      src: "/assets/croissants/doughBeforRoll.jpg",
      alt: "Deeg voor het rollen",
    },
    {
      src: "/assets/croissants/rolledDough.jpg",
      alt: "Gerold deeg",
    },
    {
      src: "/assets/croissants/preCutCroissant.jpg",
      alt: "Voorgesneden croissants",
    },
    {
      src: "/assets/croissants/rolledCroissant.jpg",
      alt: "Opgerolde croissants",
    },
    {
      src: "/assets/croissants/cutOffs.jpg",
      alt: "Afgesneden deeg",
    },
    {
      src: "/assets/croissants/offCutBunn.jpg",
      alt: "Overgebleven deeg",
    },
    {
      src: "/assets/croissants/croissantOnTray.jpg",
      alt: "Croissants op de bakplaat",
    },
  ];

  return (
    <div className={styles.recipePage}>

      <header className={styles.header}>
        <h1>Croissants</h1>
        <p>From sourdough to croissant</p>
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

      <section className={styles.outerRecipi}>
        <article className={styles.textContainer}>
          
          <h2>Ingredienten</h2>
          <ul>
            <li>450 gr bloem</li>
            <li>230 gr water</li>
            <li>140 gr actieve starter</li>
            <li>50 gr boter</li>
            <li>8 gr zout</li>
            <li>250 gr boter</li>
          </ul>

          <h2>Werkwijze</h2>

          <ol className={styles.orderdlist}>

            <li>
              <p>
                Voed je starter als normaal en wacht tot deze actief is.
              </p>
            </li>

            <li>
              <p>
                Pak een pan of kom. Weeg daar alle ingrediënten in af en meng.
                Laat dit 1 uur buiten de koelkast staan.
              </p>
            </li>

            <li>
              <p>
                Pak de 250gr boter. Sla deze plat tussen bakpapier en maak een
                vierkant van 15x15cm. Leg de boter in de koelkast.
              </p>
            </li>

            <li>
              <p>
                Het deeg zelf moet 1 nacht in de koelkast.
              </p>
            </li>

            <li>
              <p>
                Dag 2: pak het deeg, bestuif je werkbank met ruim bloem en rol
                het deeg tot een vierkant dat 2x groter is dan het botervierkant.
              </p>
            </li>

            <li>
              <p>
                De boter moet buigzaam zijn. Leg deze in het midden en vouw de
                punten dicht als een envelop.
              </p>
            </li>

            <li>
              <p>
                Bloem je werkbank. Draai het deeg een kwartslag zodat de open
                kant aan de zijkant ligt als een boek.
              </p>
            </li>

            <li>
              <p>
                Rol het deeg uit tot een vierkant van 26x20cm. Vouw de
                onderkant 1/3 naar binnen en de bovenkant ook 1/3 naar binnen
                en eroverheen.
              </p>
            </li>

            <li>
              <p>
                Herhaal deze toer nog 1x. Leg het deeg daarna 1 uur in de
                koelkast. Na dit uur doe je nog 1 toer.
              </p>
            </li>

            <li>
              <p>
                Als je 3 toeren hebt gedaan, heb je 27 laagjes. Pak het deeg
                in plastic of bakpapier. Dit deeg moet 1 nacht rijzen in de koeling.
              </p>
            </li>

            <li>
              <p>
                Dag 3: bestuif je werkbank met bloem. Snijd het deeg doormidden
                of rol het in 1x uit.
              </p>
            </li>

            <li>
              <p>
                Rol het deeg uit tot een rechthoek van 20x30cm.
              </p>
            </li>

            <li>
              <p>
                Pak je rolmaat. Maak bovenaan elke 5cm een inkeping en onderaan
                elke 10cm een inkeping.
              </p>
            </li>

            <li>
              <p>
                Snijd zigzag van boven naar beneden zodat er punten ontstaan.
              </p>
            </li>

            <li>
              <p>
                Trek de uiteinden uit elkaar waar je de inkeping van 5cm hebt
                gemaakt.
              </p>
            </li>

            <li>
              <p>
                Rol de croissant vanaf de brede kant naar boven strak op.
              </p>
            </li>

              <li>
                <p>
                  de croissants zijn klaar voor een 8 uur rijs. dek ze af met een zak of met bakpapier
                </p>
              </li>

              <li>
                <p>
                  lak de croissants met melk en ei, bak ze af in een voorverwarmde oven van 200 graden 15min
                </p>
              </li>

          </ol>

        </article>
      </section>

      <footer className={styles.footer}>
        <FooterLayout />
      </footer>

    </div>
  );
}

export default Croissants;
