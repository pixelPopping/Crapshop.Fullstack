import axiosClient from "./axiosClient";

console.log("productsApi geladen");

export async function getProducts(signal) {
  const response = await axiosClient.get("/products", {
    signal,
  });

  return response.data;
}

export async function getCategories(signal) {
  const response = await axiosClient.get("/products/categories", {
    signal,
  });

  return response.data;
}

export async function getProduct(id, signal) {
  console.log("getProduct aangeroepen met:", id);

  const response = await axiosClient.get(`/products/${id}`, {
    signal,
  });

  console.log("Response:", response.data);

  return response.data;
}
