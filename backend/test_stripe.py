import os
from dotenv import load_dotenv


print(os.getenv("STRIPE_SECRET_KEY"))

import stripe

from flask import Blueprint, jsonify


load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

payment_bp = Blueprint("payments", __name__)


@payment_bp.route("/create-checkout-session", methods=["POST"])
def create_checkout_session():
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[
                {
                    "price_data": {
                        "currency": "eur",
                        "product_data": {
                            "name": "Test bestelling",
                        },
                        "unit_amount": 1999,  # €19,99
                    },
                    "quantity": 1,
                }
            ],
            mode="payment",
            success_url="http://localhost:5173/success",
            cancel_url="http://localhost:5173/checkout",
        )

        return jsonify({
            "url": session.url,
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500