"""
AUTH MIDDLEWARE

Controleert het JWT-token en maakt de gebruiker beschikbaar via g.user_id.
"""

from functools import wraps

import jwt
from flask import (
    current_app,
    g,
    jsonify,
    request,
)


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return jsonify({
                "message": "Token ontbreekt."
            }), 401

        if not auth_header.startswith("Bearer "):
            return jsonify({
                "message": "Ongeldig Authorization-header."
            }), 401

        token = auth_header.split(" ")[1]

        try:
            payload = jwt.decode(
                token,
                current_app.config["SECRET_KEY"],
                algorithms=["HS256"],
            )

            print(payload)

            g.user_id = payload["user_id"]

        except jwt.ExpiredSignatureError:
            return jsonify({
                "message": "Token verlopen."
            }), 401

        except jwt.InvalidTokenError:
            return jsonify({
                "message": "Ongeldig token."
            }), 401

        return f(*args, **kwargs)

    return decorated