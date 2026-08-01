"""
USER SERVICE

Doel:
Bevat alle databasefuncties voor gebruikers.
"""

from app.database.connection import get_db
from app.database.connection import get_db

def create_user(username, email, password_hash):
    """
    Voegt een nieuwe gebruiker toe.
    """

    conn = get_db()

    cursor = conn.execute(
        """
        INSERT INTO users (
            username,
            email,
            password_hash
        )
        VALUES (?, ?, ?)
        """,
        (username, email, password_hash),
    )

    conn.commit()

    user_id = cursor.lastrowid

    conn.close()

    return user_id


def get_user_by_id(user_id):
    """
    Haalt een gebruiker op aan de hand van het ID.
    """

    conn = get_db()

    user = conn.execute(
        """
        SELECT *
        FROM users
        WHERE id = ?
        """,
        (user_id,),
    ).fetchone()

    conn.close()

    return dict(user) if user else None


def get_user_by_email(email):
    """
    Zoekt een gebruiker op e-mailadres.
    """

    conn = get_db()

    user = conn.execute(
        """
        SELECT *
        FROM users
        WHERE email = ?
        """,
        (email,),
    ).fetchone()

    conn.close()

    return dict(user) if user else None


def get_user_by_username(username):
    """
    Zoekt een gebruiker op gebruikersnaam.
    """

    conn = get_db()

    user = conn.execute(
        """
        SELECT *
        FROM users
        WHERE username = ?
        """,
        (username,),
    ).fetchone()

    conn.close()

    return dict(user) if user else None

"""
CART SERVICE

Doel:
Bevat alle databasefuncties voor de winkelwagen.
"""
def get_or_create_cart(user_id):
    """
    Haalt de winkelwagen van een gebruiker op.
    Bestaat deze nog niet, dan wordt hij aangemaakt.
    """

    conn = get_db()

    cart = conn.execute(
        """
        SELECT *
        FROM carts
        WHERE user_id = ?
        """,
        (user_id,),
    ).fetchone()

    if cart:
        cart_id = cart["id"]

    else:
        cursor = conn.execute(
            """
            INSERT INTO carts (user_id)
            VALUES (?)
            """,
            (user_id,),
        )

        conn.commit()

        cart_id = cursor.lastrowid

    conn.close()

    return cart_id

from app.database.connection import get_db


def get_cart_items(user_id):
    """
    Haalt alle producten uit de winkelwagen van een gebruiker op.
    """

    conn = get_db()

    items = conn.execute(
        """
        SELECT
            products.id,
            products.title,
            products.price,
            cart_items.quantity
        FROM carts
        JOIN cart_items
            ON carts.id = cart_items.cart_id
        JOIN products
            ON cart_items.product_id = products.id
        WHERE carts.user_id = ?
        """,
        (user_id,),
    ).fetchall()

    conn.close()

    return [dict(item) for item in items]