"""
AUTH ROUTES

Doel:
Bevat alle authenticatie-routes.
"""

from flask import Blueprint, jsonify, request
import jwt
import datetime

from config import Config

auth_bp = Blueprint("auth", __name__)


"""
ROUTE: POST /api/auth/register

Doel:
Registreert een nieuwe gebruiker.
"""
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    return jsonify({
        "message": "Registratie gelukt.",
        "user": data
    }), 201


"""
ROUTE: POST /api/auth/login

Doel:
Logt een gebruiker in.
"""
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    payload = {
        "id": 1,
        "username": data["email"].split("@")[0],
        "email": data["email"],
        "roles": ["USER"],
        "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)
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