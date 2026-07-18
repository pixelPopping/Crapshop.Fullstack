import axiosClient from "./axiosClient";

/*
AUTH API

Doel:
Alle requests naar de authenticatie backend.
*/

/*
POST /api/auth/register

Doel:
Registreert een gebruiker.
*/
export async function registerUser(user) {
  const response = await axiosClient.post("/auth/register", user);

  return response.data;
}

/*
POST /api/auth/login

Doel:
Logt een gebruiker in.
*/
export async function loginUser(credentials) {
  const response = await axiosClient.post("/auth/login", credentials);

  return response.data;
}
