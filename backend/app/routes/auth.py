from flask import Blueprint, jsonify, request
import jwt
import datetime

from werkzeug.security import (
    generate_password_hash,
)

from config import Config

from app.services.users import (
    create_user,
    get_user_by_email,
    get_user_by_username,
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST", "OPTIONS"], strict_slashes=False)
def register():

    if request.method == "OPTIONS":
        return "", 200

    data = request.get_json()
    print(data)

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    # Controleer of alle velden zijn ingevuld
    if not username or not email or not password:
        return jsonify({
            "message": "Alle velden zijn verplicht."
        }), 400

    # Controleer of de gebruikersnaam al bestaat
    if get_user_by_username(username):
        return jsonify({
            "message": "Gebruikersnaam bestaat al."
        }), 409

    # Controleer of het e-mailadres al bestaat
    if get_user_by_email(email):
        return jsonify({
            "message": "E-mailadres bestaat al."
        }), 409

    # Hash het wachtwoord
    password_hash = generate_password_hash(password)

    # Sla de gebruiker op
    user_id = create_user(
        username,
        email,
        password_hash,
    )

    return jsonify({
        "message": "Registratie gelukt.",
        "user_id": user_id,
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