import { useEffect, useState } from "react";
import { getProduct } from "../api/productsApi";

export default function useProduct(id) {
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

            setProduct(data);
        } catch (err) {
            if (err.name !== "CanceledError") {
                setProduct(null);
                setError("Product kon niet worden geladen.");
            }
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
