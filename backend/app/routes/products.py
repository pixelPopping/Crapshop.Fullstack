"""
PRODUCT ROUTES

Doel:
Bevat alle API-routes voor producten.
"""

from flask import Blueprint, jsonify
from app.data.products import products

products_bp = Blueprint("products", __name__)


"""
ROUTE: GET /api/products

Doel:
Haalt alle producten op.
"""
@products_bp.route("/", methods=["GET"])
def get_products():
    return jsonify(products)


"""
ROUTE: GET /api/products/categories

Doel:
Haalt alle unieke productcategorieën op.
"""
@products_bp.route("/categories", methods=["GET"])
def get_categories():
    categories = list(
        set(product["category"] for product in products)
    )

    return jsonify(categories)


"""
ROUTE: GET /api/products/<id>

Doel:
Haalt één product op aan de hand van het id.
"""
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