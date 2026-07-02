import { jwtDecode } from "jwt-decode";

export function getUserFromToken(token) {
    const decoded = jwtDecode(token);

    return {
        email: decoded.email,
        id: decoded.sub || decoded.userId,
        roles: decoded.roles || [decoded.role],
        projectId: decoded.projectId,
    };
}