"""
AUTH ROUTES

Bevat:
- Registreren
- Inloggen
"""

import datetime
from app.middleware.auth import token_required
import jwt
from flask import (
    Blueprint,
    current_app,
    jsonify,
    request,
    g,
)
from werkzeug.security import (
    check_password_hash,
    generate_password_hash,
)

from app.services.users import (
    create_user,
    get_user_by_email,
    get_user_by_id,
    get_user_by_username,
)

auth_bp = Blueprint("auth", __name__)


@auth_bp.route("/register", methods=["POST"])
def register():
    """
    Registreert een nieuwe gebruiker.
    """

    data = request.get_json()

    if data is None:
        return jsonify({
            "message": "Ongeldige JSON."
        }), 400

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({
            "message": "Alle velden zijn verplicht."
        }), 400

    if get_user_by_username(username):
        return jsonify({
            "message": "Gebruikersnaam bestaat al."
        }), 409

    if get_user_by_email(email):
        return jsonify({
            "message": "E-mailadres bestaat al."
        }), 409

    password_hash = generate_password_hash(password)

    user_id = create_user(
        username,
        email,
        password_hash,
    )

    return jsonify({
        "message": "Registratie gelukt.",
        "user_id": user_id,
    }), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    """
    Logt een gebruiker in en retourneert een JWT.
    """

    data = request.get_json()

    if data is None:
        return jsonify({
            "message": "Ongeldige JSON."
        }), 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "message": "Email en wachtwoord zijn verplicht."
        }), 400

    user = get_user_by_email(email)

    if user is None:
        return jsonify({
            "message": "Ongeldige inloggegevens."
        }), 401

    if not check_password_hash(
        user["password_hash"],
        password,
    ):
        return jsonify({
            "message": "Ongeldige inloggegevens."
        }), 401

    payload = {
        "user_id": user["id"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1),
    }

    token = jwt.encode(
        payload,
        current_app.config["SECRET_KEY"],
        algorithm="HS256",
    )

    return jsonify({
        "message": "Login gelukt.",
        "token": token,
    }), 200

@auth_bp.route("/me", methods=["GET"])
@token_required
def me():
    """
    Geeft de ingelogde gebruiker terug.
    """

    user = get_user_by_id(g.user_id)

    if user is None:
        return jsonify({
            "message": "Gebruiker niet gevonden."
        }), 404

    return jsonify({
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "created_at": user["created_at"],
    }), 200