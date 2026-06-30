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

                const products = await getProducts(
                    controller.signal
                );

                const categories = await getCategories(
                    controller.signal
                );

                setProducts(products);

                setCategories([
                    "Alle categorieën",
                    ...categories,
                ]);

            } catch (error) {

                if (
                    error.name !== "CanceledError" &&
                    error.code !== "ERR_CANCELED"
                ) {
                    console.error(error);

                    setError(
                        "Kon producten niet laden."
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