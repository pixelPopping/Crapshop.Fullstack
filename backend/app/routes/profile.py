from flask import Blueprint, jsonify, g

from app.middleware.auth import token_required
from app.services.users import get_user_by_id

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/", methods=["GET"])
@token_required
def get_profile():

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