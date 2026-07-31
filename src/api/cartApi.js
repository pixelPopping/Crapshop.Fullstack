
  console.log("TOKEN:", token);

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