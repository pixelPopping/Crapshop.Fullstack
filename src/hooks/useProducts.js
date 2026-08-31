import { useEffect, useState } from "react";
import {
  getProducts,
  getCategories,
} from "../api/productsApi";

const DEMO_PRODUCTS = "/products.json";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Alle categorieën",
  ]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function loadDemoProducts() {
      const response = await fetch(
        DEMO_PRODUCTS,
        {
          signal: controller.signal,
        }
      );

      if (!response.ok) {
        throw new Error(
          "products.json kon niet worden geladen."
        );
      }

      const data = await response.json();

      const localProducts = Array.isArray(data)
        ? data
        : Array.isArray(data.products)
        ? data.products
        : [];

      if (localProducts.length === 0) {
        throw new Error(
          "Geen producten gevonden in products.json."
        );
      }

      const localCategories = [
        ...new Set(
          localProducts
            .map((product) => product.category)
            .filter(Boolean)
        ),
      ];

      setProducts(localProducts);

      setCategories([
        "Alle categorieën",
        ...localCategories,
      ]);

      setDemoMode(true);
      setError("");

      console.log(
        "✅ DEMO PRODUCTS:",
        localProducts
      );
    }

    async function loadProducts() {
      setLoading(true);
      setError("");

      try {
        // Eerst backend proberen
        const productsData = await getProducts(
          controller.signal
        );

        const backendProducts = Array.isArray(
          productsData
        )
          ? productsData
          : Array.isArray(productsData?.products)
          ? productsData.products
          : [];

        if (backendProducts.length === 0) {
          throw new Error(
            "Backend returned no products."
          );
        }

        setProducts(backendProducts);

        // Categories hoeven de demo niet te breken
        try {
          const categoriesData =
            await getCategories(
              controller.signal
            );

          const backendCategories =
            Array.isArray(categoriesData)
              ? categoriesData
              : Array.isArray(
                  categoriesData?.categories
                )
              ? categoriesData.categories
              : [
                  ...new Set(
                    backendProducts
                      .map(
                        (product) =>
                          product.category
                      )
                      .filter(Boolean)
                  ),
                ];

          setCategories([
            "Alle categorieën",
            ...backendCategories,
          ]);
        } catch {
          const fallbackCategories = [
            ...new Set(
              backendProducts
                .map(
                  (product) =>
                    product.category
                )
                .filter(Boolean)
            ),
          ];

          setCategories([
            "Alle categorieën",
            ...fallbackCategories,
          ]);
        }

        setDemoMode(false);

        console.log(
          "✅ PRODUCTS FROM BACKEND:",
          backendProducts
        );
      } catch (err) {
        if (
          err.name === "CanceledError" ||
          err.code === "ERR_CANCELED" ||
          err.name === "AbortError"
        ) {
          return;
        }

        console.warn(
          "⚠️ Backend unavailable."
        );

        try {
          await loadDemoProducts();
        } catch (fallbackError) {
          if (
            fallbackError.name ===
            "AbortError"
          ) {
            return;
          }

          console.error(
            "❌ Demo products failed:",
            fallbackError
          );

          setProducts([]);
          setCategories([
            "Alle categorieën",
          ]);
          setDemoMode(true);
          setError(
            "Demo producten konden niet worden geladen."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return {
    products,
    categories,
    loading,
    error,
    demoMode,
  };
}