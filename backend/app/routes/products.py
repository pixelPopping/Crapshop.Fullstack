"""
PRODUCT ROUTES

Doel:
Bevat alle API-routes voor producten.
"""

from flask import Blueprint, jsonify

from app.services.products import (
    get_all_products,
    get_product_by_id,
    get_products_by_category,
    get_categories as get_product_categories,
)

products_bp = Blueprint("products", __name__)


# Alle producten
@products_bp.route("", methods=["GET"])
def get_products():
    """
    Haalt alle producten op.
    """

    return jsonify(get_all_products())


# Alle categorieën
@products_bp.route("/categories", methods=["GET"])
def get_categories():
    """
    Haalt alle categorieën op.
    """

    return jsonify(get_product_categories())


# Producten per categorie
@products_bp.route("/category/<string:name>", methods=["GET"])
def products_by_category(name):
    """
    Haalt alle producten op uit een categorie.
    """

    return jsonify(get_products_by_category(name))


# Eén product ophalen
@products_bp.route("/<int:id>", methods=["GET"])
def get_product(id):
    """
    Haalt één product op.
    """

    product = get_product_by_id(id)

    if product is None:
        return jsonify({
            "message": "Product niet gevonden."
        }), 404

    return jsonify(product)