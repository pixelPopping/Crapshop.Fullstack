from flask import Blueprint, jsonify, request
import jwt
import datetime

from config import Config

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST", "OPTIONS"], strict_slashes=False)
def register():

    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    print("REGISTER DATA:")
    print(data)

    return jsonify({
        "message": "Registratie gelukt.",
        "user": data
    }), 201


@auth_bp.route("/login", methods=["POST", "OPTIONS"], strict_slashes=False)
def login():

    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()

    payload = {
        "id": 1,
        "username": data["email"].split("@")[0],
        "email": data["email"],
        "roles": ["USER"],
        "exp": datetime.datetime.utcnow()
        + datetime.timedelta(hours=1)
    }

    token = jwt.encode(
        payload,
        Config.SECRET_KEY,
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login gelukt.",
        "token": token
    }), 200