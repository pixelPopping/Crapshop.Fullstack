console.log(">>> useProduct FILE geladen <<<");

import { useEffect, useState } from "react";
import { getProduct } from "../api/productsApi";

export default function useProduct(id) {
  console.log(">>> useProduct HOOK <<<", id);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const data = await getProduct(id, controller.signal);

        console.log("Product uit API:", data);

        setProduct(data);
      } catch (err) {
        console.log("CATCH:", err);

        if (
          err.name === "CanceledError" ||
          err.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error(err);

        setProduct(null);
        setError("Product kon niet worden geladen.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();

    return () => controller.abort();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}