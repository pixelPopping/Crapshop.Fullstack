from app.database.connection import get_db
from app.services.cart import get_cart_items

def create_order(user_id):
    cart_items = get_cart_items(user_id)

    if not cart_items:
        raise ValueError("Winkelwagen is leeg.")

    total_price = sum(
        item["price"] * item["quantity"]
        for item in cart_items
    )

    conn = get_db()

    cursor = conn.execute(
        """
        INSERT INTO orders (user_id, total_price)
        VALUES (?, ?)
        """,
        (user_id, total_price),
    )

    order_id = cursor.lastrowid

    conn.commit()
    conn.close()

    return order_id

def get_orders(user_id):
    pass


def get_order(order_id):
    pass