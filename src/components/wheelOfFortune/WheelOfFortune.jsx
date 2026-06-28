import "./wheelspin.css";
import { useContext, useEffect } from "react";
import { SpinContext } from "../../context/SpinContext.jsx";

function WheelOfFortune({ buttonLabel = "Spin", onResult }) {
    const { handleSpin, spin, spinning, results } = useContext(SpinContext);

    useEffect(() => {
        if (results && onResult) {
            onResult(results);
        }
    }, [results, onResult]);

    return (
        <>
            <div className="wheel-container">
                <section className="button-container">
                    <button
                        className="spin-button"
                        onClick={handleSpin}
                        disabled={spinning || spin <= 0}
                    >
                        {spinning ? "Spinning..." : `${buttonLabel} (${spin})`}
                    </button>
                </section>
            </div>
            <section className="result-container">
                {results && !spinning && (
                    <p className="spin-result">
                        Your Result is...: <strong>{results}</strong>
                    </p>
                )}
            </section>
        </>
    );
}

export default WheelOfFortune;






