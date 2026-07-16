from flask import Blueprint, jsonify, request
import jwt

from config import Config

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("", methods=["GET", "OPTIONS"], strict_slashes=False)
@profile_bp.route("/", methods=["GET", "OPTIONS"], strict_slashes=False)
def get_profile():

    if request.method == "OPTIONS":
        return "", 200

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Geen token gevonden."
        }), 401

    try:
        token = auth_header.split(" ")[1]

        payload = jwt.decode(
            token,
            Config.SECRET_KEY,
            algorithms=["HS256"]
        )

        return jsonify({
            "id": payload["id"],
            "username": payload["username"],
            "email": payload["email"],
            "roles": payload["roles"]
        }), 200

    except jwt.ExpiredSignatureError:
        return jsonify({
            "message": "Token verlopen."
        }), 401

    except jwt.InvalidTokenError:
        return jsonify({
            "message": "Ongeldige token."
        }), 401