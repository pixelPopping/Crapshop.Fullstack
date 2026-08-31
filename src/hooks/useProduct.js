import { useEffect, useState } from "react";
import { getProduct } from "../api/productsApi";

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setDemoMode(false);

        // ==========================================
        // BACKEND
        // ==========================================

        const data = await getProduct(
          id,
          controller.signal
        );

        setProduct(data);

        console.log(
          "✅ Product loaded from backend"
        );

      } catch (err) {
        // ==========================================
        // REQUEST CANCELLED
        // ==========================================

        if (
          err.name === "CanceledError" ||
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.warn(
          "⚠️ Backend unavailable"
        );

        console.warn(
          "Starting product demo mode..."
        );

        // ==========================================
        // FALLBACK
        // ==========================================

        try {
          const response = await fetch(
            "/products.json"
          );

          if (!response.ok) {
            throw new Error(
              "Lokale producten konden niet worden geladen."
            );
          }

          const localProducts =
            await response.json();

          const localProduct =
            localProducts.find(
              (item) =>
                String(item.id) === String(id)
            );

          if (!localProduct) {
            throw new Error(
              "Product niet gevonden."
            );
          }

          setProduct(localProduct);
          setDemoMode(true);
          setError("");

          console.log(
            "✅ Product loaded from demo data"
          );

        } catch (fallbackError) {
          console.error(
            "❌ Product fallback failed:",
            fallbackError
          );

          setProduct(null);
          setDemoMode(true);
          setError(
            "Product kon niet worden geladen."
          );
        }
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchProduct();
    } else {
      setProduct(null);
      setLoading(false);
      setError("Geen product gevonden.");
    }

    return () => {
      controller.abort();
    };
  }, [id]);

  return {
    product,
    loading,
    error,
    demoMode,
  };
}