import { jwtDecode } from "jwt-decode";

export function getUserFromToken(token) {
  const decoded = jwtDecode(token);

  return {
    id: decoded.user_id,
  };
}
