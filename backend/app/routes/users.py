from flask import Blueprint, jsonify, g
from app.middleware.auth import token_required

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/me", methods=["GET"])
@token_required
def me():
    return jsonify({
        "user_id": g.user_id
    })