import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/payments";

export async function createCheckoutSession() {
  const token = localStorage.getItem("token");

  return axios.post(
    `${API_URL}/create-checkout-session`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}