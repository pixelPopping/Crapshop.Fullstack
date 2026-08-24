from flask import Blueprint, jsonify, g
from app.middleware.auth import token_required
from app.services.cart import get_cart_items

import os
import stripe

payment_bp = Blueprint("payments", __name__)

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")


@payment_bp.route("/create-checkout-session", methods=["POST"])
@token_required
def create_checkout_session():
    cart_items = get_cart_items(g.user_id)

    line_items = []

    for item in cart_items:
        line_items.append(
            {
                "price_data": {
                    "currency": "eur",
                    "product_data": {
                        "name": item["title"],
                    },
                    "unit_amount": int(item["price"] * 100),
                },
                "quantity": item["quantity"],
            }
        )

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=line_items,
        mode="payment",
        success_url="http://localhost:5173/success",
        cancel_url="http://localhost:5173/checkout",
    )

    return jsonify({
        "url": session.url,
    }), 200