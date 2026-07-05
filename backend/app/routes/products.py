"""
ROUTE: GET /api/products

Doel:
Haalt alle producten op.
"""

from flask import Blueprint, jsonify

products_bp = Blueprint("products", __name__)


@products_bp.route("/", methods=["GET"])
def get_products():
    products = [
        {
            "id": 1,
            "title": "Laptop",
            "description": "Powerful laptop for work and gaming.",
            "price": 999.99,
            "category": "electronics",
            "image": "https://via.placeholder.com/300",
            "rating": {
                "rate": 4.8,
                "count": 120
            }
        },
        {
            "id": 2,
            "title": "Keyboard",
            "description": "Mechanical gaming keyboard.",
            "price": 59.99,
            "category": "electronics",
            "image": "https://via.placeholder.com/300",
            "rating": {
                "rate": 4.5,
                "count": 80
            }
        },
        {
            "id": 3,
            "title": "T-Shirt",
            "description": "100% cotton T-shirt.",
            "price": 19.99,
            "category": "men's clothing",
            "image": "https://via.placeholder.com/300",
            "rating": {
                "rate": 4.2,
                "count": 45
            }
        }
    ]

    return jsonify(products)


"""
ROUTE: GET /api/products/categories

Doel:
Haalt alle productcategorieën op.
"""

@products_bp.route("/categories", methods=["GET"])
def get_categories():
    categories = [
        "Laptops",
        "Gaming",
        "Kleding",
        "Accessoires",
    ]

    return jsonify(categories)