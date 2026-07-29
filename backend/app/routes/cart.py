"""
CART ROUTES

Doel:
Bevat alle API-routes voor de winkelwagen.
"""

from flask import Blueprint, jsonify, request, g

from app.middleware.auth import token_required

from app.services.cart import (
    get_cart_items,
    add_to_cart,
    update_cart_item_quantity,
    remove_cart_item
)

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/", methods=["GET"])
@token_required
def get_cart():
    """
    Haalt de winkelwagen van de ingelogde gebruiker op.
    """

    items = get_cart_items(g.user_id)

    return jsonify(items), 200


@cart_bp.route("/items", methods=["POST"])
@token_required
def create_cart_item():
    """
    Voegt een product toe aan de winkelwagen.
    """

    data = request.get_json()

    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    if not product_id:
        return jsonify({
            "error": "product_id is verplicht."
        }), 400

    add_to_cart(
        g.user_id,
        product_id,
        quantity,
    )

    return jsonify({
        "message": "Product toegevoegd aan winkelwagen."
    }), 201


@cart_bp.route("/items/<int:product_id>", methods=["PUT"])
@token_required
def update_cart_item(product_id):
    """
    Past de hoeveelheid van een product in de winkelwagen aan.
    """

    data = request.get_json()

    quantity = data.get("quantity")

    if quantity is None:
        return jsonify({
            "error": "quantity is verplicht."
        }), 400

    update_cart_item_quantity(
        g.user_id,
        product_id,
        quantity,
    )

    return jsonify({
        "message": "Hoeveelheid bijgewerkt."
    }), 200

@cart_bp.route("/items/<int:product_id>", methods=["DELETE"])
@token_required
def delete_cart_item(product_id):
    """
    Verwijdert een product uit de winkelwagen.
    """

    remove_cart_item(
        g.user_id,
        product_id,
    )

    return jsonify({
        "message": "Product verwijderd uit winkelwagen."
    }), 200