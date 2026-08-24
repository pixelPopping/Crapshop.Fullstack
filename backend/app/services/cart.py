"""
CART SERVICE

Doel:
Bevat alle databasefuncties voor de winkelwagen.
"""
from app.database.connection import get_db

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

def get_cart_items(user_id):
    """
    Haalt alle producten uit de winkelwagen van de gebruiker op.
    """

    conn = get_db()

    print(f"\n=== Winkelwagen gebruiker {user_id} ===")

    carts = conn.execute(
        """
        SELECT *
        FROM carts
        WHERE user_id = ?
        """,
        (user_id,),
    ).fetchall()

    print("Winkelwagens:")
    for cart in carts:
        print(dict(cart))

    items = conn.execute(
        """
        SELECT
            products.id,
            products.title,
            products.price,
            products.image,
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

    print("Producten in winkelwagen:")
    for item in items:
        print(dict(item))

    conn.close()

    return [dict(item) for item in items]

def add_to_cart(user_id, product_id, quantity):
    """
    Voegt een product toe aan de winkelwagen.
    """

    cart_id = get_or_create_cart(user_id)

    conn = get_db()

    existing_item = conn.execute(
        """
        SELECT *
        FROM cart_items
        WHERE cart_id = ?
        AND product_id = ?
        """,
        (cart_id, product_id),
    ).fetchone()

    if existing_item:
        conn.execute(
            """
            UPDATE cart_items
            SET quantity = quantity + ?
            WHERE cart_id = ?
            AND product_id = ?
            """,
            (quantity, cart_id, product_id),
        )
    else:
        conn.execute(
            """
            INSERT INTO cart_items (cart_id, product_id, quantity)
            VALUES (?, ?, ?)
            """,
            (cart_id, product_id, quantity),
        )

    conn.commit()
    conn.close()

def update_cart_item_quantity(user_id, product_id, quantity):
    """
    Past de hoeveelheid van een product in de winkelwagen aan.
    """

    cart_id = get_or_create_cart(user_id)

    conn = get_db()

    conn.execute(
        """
        UPDATE cart_items
        SET quantity = ?
        WHERE cart_id = ?
        AND product_id = ?
        """,
        (quantity, cart_id, product_id),
    )

    conn.commit()
    conn.close()

def remove_cart_item(user_id, product_id):
    """
    Verwijdert een product uit de winkelwagen.
    """

    cart_id = get_or_create_cart(user_id)

    conn = get_db()

    conn.execute(
        """
        DELETE FROM cart_items
        WHERE cart_id = ?
        AND product_id = ?
        """,
        (cart_id, product_id),
    )

    conn.commit()
    conn.close()