import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/cart";

function getToken() {
  return localStorage.getItem("token");
}

export function getCart() {
  return axios.get(API_URL + "/", {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
}


export function addToCart(productId, quantity = 1) {
  return axios.post(
    API_URL + "/items",
    {
      product_id: productId,
      quantity: quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}

export function updateCart(productId, quantity) {
  return axios.put(
    `http://127.0.0.1:5000/api/cart/items/${productId}`,
    {
      quantity,
    },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}

export function deleteCartItem(productId) {
  return axios.delete(
    `http://127.0.0.1:5000/api/cart/items/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}