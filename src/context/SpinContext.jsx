import { createContext, useContext, useEffect, useRef, useState } from "react";
import getItems from "../helpers/getItems.jsx";
import getAnglePerItem from "../helpers/getAnglePerItem";
import getRandomIndex from "../helpers/getRandomIndex";
import { AuthContext } from "./AuthContext.jsx";
import { useNavigate } from "react-router-dom";

export const SpinContext = createContext({});

export const SpinProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [results, setResults] = useState("");
  const timeoutRef = useRef(null);
  const [spin, setSpin] = useState(3);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const getStorageKey = (userId) => `spinsLeft_${userId || "guest"}`;

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    const key = getStorageKey(user?.id);
    const savedSpins = localStorage.getItem(key);

    if (savedSpins !== null && !isNaN(savedSpins)) {
      setSpin(Number(savedSpins));
    } else {
      const defaultSpins = 3;
      setSpin(defaultSpins);
      localStorage.setItem(key, defaultSpins.toString());
    }
  }, [user?.id]);

  useEffect(() => {
    if (user?.id) {
      const key = getStorageKey(user.id);
      localStorage.setItem(key, spin.toString());
    }
  }, [spin, user?.id]);

  useEffect(() => {
    if (!results) return;

    const delay = setTimeout(() => {
      const validRoutes = [
        "jewelery",
        "men's clothing",
        "women's clothing",
        "electronics",
      ];
      if (validRoutes.includes(results)) {
        navigate(`/products/${encodeURIComponent(results)}`);
      }
      setResults("");
    }, 2500);

    return () => clearTimeout(delay);
  }, [results, navigate]);

  function handleSpin() {
    if (spin <= 0 || spinning) return;

    const items = getItems();
    const anglePerItem = getAnglePerItem(items);
    const index = getRandomIndex(items);
    const middleOfSegment = index * anglePerItem + anglePerItem / 2;
    const extraRotation = 360 * 5 + middleOfSegment;
    const newRotation = rotation + extraRotation;

    setRotation(newRotation);
    setSpinning(true);

    timeoutRef.current = setTimeout(() => {
      setSpinning(false);
      setResults(items[index]);

      const spans = document.querySelectorAll(".box1 span");
      spans.forEach((span) => span.classList.remove("highlighted"));
      if (spans[index]) {
        spans[index].classList.add("highlighted");
      }

      if (items[index] !== "extra spin") {
        setSpin((prev) => Math.max(prev - 1, 0));
      }
    }, 3000);
  }

  return (
    <SpinContext.Provider
      value={{
        spin,
        setSpin,
        handleSpin,
        results,
        spinning,
        rotation,
        setRotation,
        setSpinning,
        timeoutRef,
      }}
    >
      {children}
    </SpinContext.Provider>
  );
};

export default SpinProvider;
