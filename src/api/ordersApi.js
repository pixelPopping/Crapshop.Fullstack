import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/orders";

function getToken() {
  return localStorage.getItem("token");
}

export async function checkout() {
  return axios.post(
    `${API_URL}/checkout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
}