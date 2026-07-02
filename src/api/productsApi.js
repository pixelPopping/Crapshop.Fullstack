import axiosClient from "./axiosClient";

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
  const response = await api.get(`/products/${id}`, {
    signal,
  });

  return response.data;
}
