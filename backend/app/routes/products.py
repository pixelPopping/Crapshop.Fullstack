"""
PRODUCT ROUTES

Doel:
Bevat alle API-routes voor producten.
"""

from flask import Blueprint, jsonify
from app.data.products import products
from app.data.categories import categories

products_bp = Blueprint("products", __name__)


# Alle producten
@products_bp.route("/", methods=["GET"])
def get_products():
    return jsonify(products)


# Alle categorieën
@products_bp.route("/categories", methods=["GET"])
def get_categories():
    return jsonify(categories)


# Producten per categorie
@products_bp.route("/category/<string:name>", methods=["GET"])
def get_products_by_category(name):

    filtered_products = [
        product
        for product in products
        if product["category"].lower() == name.lower()
    ]

    return jsonify(filtered_products)


# Eén product ophalen
@products_bp.route("/<int:id>", methods=["GET"])
def get_product(id):

    product = next(
        (item for item in products if item["id"] == id),
        None
    )

    if product is None:
        return jsonify({
            "message": "Product niet gevonden."
        }), 404

    return jsonify(product)