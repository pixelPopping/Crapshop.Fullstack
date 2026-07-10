import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function login(credentials) {
    try {
      setLoading(true);
      setError("");

      const data = await loginUser(credentials);

      return data;
    } catch (err) {
      setError("Inloggen mislukt.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  async function register(user) {
    try {
      setLoading(true);
      setError("");

      const data = await registerUser(user);

      return data;
    } catch (err) {
      setError("Registreren mislukt.");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    login,
    register,
    loading,
    error,
  };
}
