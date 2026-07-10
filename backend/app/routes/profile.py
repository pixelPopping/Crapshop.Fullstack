from flask import Blueprint, jsonify, request
import jwt

from config import Config

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/", methods=["GET"])
def get_profile():

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return jsonify({
            "message": "Geen token."
        }), 401

    try:

        token = auth_header.split(" ")[1]

        payload = jwt.decode(
            token,
            Config.SECRET_KEY,
            algorithms=["HS256"]
        )

        return jsonify({
            "username": payload["username"]
        })

    except jwt.InvalidTokenError:
        return jsonify({
            "message": "Ongeldige token."
        }), 401