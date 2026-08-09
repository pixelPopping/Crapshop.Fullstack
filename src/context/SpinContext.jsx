import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext/AuthContext";

import getItems from "../helpers/getItems";
import getRandomIndex from "../helpers/getRandomIndex";

export const SpinContext = createContext({});

export const SpinProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [spin, setSpin] = useState(3);
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [results, setResults] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);

  const timeoutRef = useRef(null);

  const getStorageKey = (userId) =>
    `spinsLeft_${userId || "guest"}`;

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const key = getStorageKey(user?.id);

    const savedSpins = localStorage.getItem(key);

    if (savedSpins !== null && !isNaN(savedSpins)) {
      setSpin(Number(savedSpins));
    } else {
      setSpin(3);
      localStorage.setItem(key, "3");
    }
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;

    const key = getStorageKey(user.id);

    localStorage.setItem(key, spin.toString());
  }, [spin, user?.id]);

  useEffect(() => {
    if (!results) return;

    const timer = setTimeout(() => {
      const validRoutes = [
        "jewelery",
        "men's clothing",
        "women's clothing",
        "electronics",
      ];

      if (validRoutes.includes(results)) {
        navigate(
          `/products/${encodeURIComponent(results)}`
        );
      }

      setResults("");
    }, 2500);

    return () => clearTimeout(timer);
  }, [results, navigate]);

  function handleSpin() {
    if (spin <= 0 || spinning) {
      return;
    }

    const items = getItems();

    const anglePerItem = 360 / items.length;

    const index = getRandomIndex(items);

    const targetAngle =
      index * anglePerItem + anglePerItem / 2;

    const currentRotation = rotation % 360;

    const newRotation =
      rotation +
      360 * 5 +
      (360 - targetAngle - currentRotation);

    setRotation(newRotation);
    setSpinning(true);
    setActiveIndex(index);

        timeoutRef.current = setTimeout(() => {
      setSpinning(false);
      setResults(items[index]);

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

        spinning,
        setSpinning,

        rotation,
        setRotation,

        results,
        setResults,

        activeIndex,
        setActiveIndex,

        handleSpin,
      }}
    >
      {children}
    </SpinContext.Provider>
  );
};

export default SpinProvider;