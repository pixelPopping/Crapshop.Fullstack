"""
PRODUCT SERVICE

Doel:
Bevat alle databasefuncties voor producten.
"""

from app.database.connection import get_db


def get_all_products():
    """
    Haalt alle producten op.
    """

    conn = get_db()

    products = conn.execute(
        "SELECT * FROM products"
    ).fetchall()

    conn.close()

    return [dict(product) for product in products]


def get_product_by_id(product_id):
    """
    Haalt één product op aan de hand van het ID.
    """

    conn = get_db()

    product = conn.execute(
        "SELECT * FROM products WHERE id = ?",
        (product_id,),
    ).fetchone()

    conn.close()

    return dict(product) if product else None


def get_products_by_category(category):
    """
    Haalt alle producten op uit een bepaalde categorie.
    """

    conn = get_db()

    products = conn.execute(
        """
        SELECT *
        FROM products
        WHERE LOWER(category) = LOWER(?)
        """,
        (category,),
    ).fetchall()

    conn.close()

    return [dict(product) for product in products]


def get_categories():
    """
    Haalt alle unieke categorieën op.
    """

    conn = get_db()

    categories = conn.execute(
        """
        SELECT DISTINCT category
        FROM products
        ORDER BY category
        """
    ).fetchall()

    conn.close()

    return [category["category"] for category in categories]