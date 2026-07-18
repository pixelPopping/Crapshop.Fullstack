import { jwtDecode } from "jwt-decode";

export function getUserFromToken(token) {
  const decoded = jwtDecode(token);

  return {
    id: decoded.id,
    username: decoded.username,
    email: decoded.email,
    roles: decoded.roles,
  };
}
