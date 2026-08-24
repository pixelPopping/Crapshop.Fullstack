from flask import Blueprint, jsonify, g

from app.middleware.auth import token_required
from app.services.orders_service import create_order

order_bp = Blueprint("orders", __name__)

@order_bp.route("/checkout", methods=["POST"])
@token_required
def checkout():
    order_id = create_order(g.user_id)

    return jsonify({
        "message": "Order aangemaakt.",
        "order_id": order_id,
    }), 201