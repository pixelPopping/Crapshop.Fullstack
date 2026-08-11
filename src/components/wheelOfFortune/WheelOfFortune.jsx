import { useContext, useEffect, useMemo } from "react";
import { SpinContext } from "../../context/SpinContext";
import getItems from "../../helpers/getItems";

import styles from "./WheelSpin.module.css";

function WheelOfFortune({
  buttonLabel = "Spin",
  onResult,
}) {
  const {
    handleSpin,
    spin,
    spinning,
    rotation,
    results,
    activeIndex,
  } = useContext(SpinContext);

  const wheelItems = useMemo(() => getItems(), []);

  useEffect(() => {
    if (results && onResult) {
      onResult(results);
    }
  }, [results, onResult]);

  return (
    <section className={styles.wheelContainer}>
      <div className={styles.animatedBox}>
        <div className={styles.mainbox}>
          <div className={styles.pointer}></div>

          <div
            className={styles.box1}
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning
                ? "transform 3s cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
              transformOrigin: "center center",
            }}
          >
            {wheelItems.map((item, index) => (
              <span
                key={index}
                className={`
                  ${styles.font}
                  ${styles[`span${index + 1}`]}
                  ${
                    activeIndex === index
                      ? styles.highlighted
                      : ""
                  }
                `}
              >
                <h5>{item}</h5>
              </span>
            ))}
          </div>
        </div>
        <div className={styles.outerContainerButton}>
        <button
          className={styles.spinButton}
          onClick={handleSpin}
          disabled={spinning || spin <= 0}
        >
          {spinning
            ? "Spinning..."
            : `${buttonLabel} (${spin})`}
        </button>
        </div>
        {results && !spinning && (
          <div className={styles.spinResult}>
            <h3>Your Result</h3>
            <p>{results}</p>
          </div>
        )}
        </div>
    </section>
  );
}

export default WheelOfFortune;