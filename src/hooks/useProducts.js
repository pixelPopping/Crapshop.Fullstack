import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
} from "../api/productsApi";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Alle categorieën",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError("");

        const products = await getProducts(
          controller.signal,
        );

        const categories = await getCategories(
          controller.signal,
        );

        setProducts(products);
        setCategories([
          "Alle categorieën",
          ...categories,
        ]);
      } catch (error) {
        if (
          error.name === "CanceledError" ||
          error.code === "ERR_CANCELED"
        ) {
          return;
        }

        try {
          const response = await fetch(
            "/products.json",
          );

          if (!response.ok) {
            throw new Error(
              "Lokale producten konden niet worden geladen.",
            );
          }

          const localProducts =
            await response.json();

          const localCategories = [
            ...new Set(
              localProducts.map(
                (product) => product.category,
              ),
            ),
          ];

          setProducts(localProducts);

          setCategories([
            "Alle categorieën",
            ...localCategories,
          ]);

          setError("");
        } catch (fallbackError) {
          setError(
            "Producten konden niet worden geladen.",
          );
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, []);

  return {
    products,
    categories,
    loading,
    error,
  };
}