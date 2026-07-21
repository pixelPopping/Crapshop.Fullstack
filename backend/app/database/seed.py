"""
SEED DATABASE

Doel:
Vult de database met initiële productdata.
"""

import json
from pathlib import Path

from app.database.connection import get_db


def seed_products():
    """
    Leest producten uit products.json en voegt ze toe aan de database.

    Wordt alleen uitgevoerd als de products-tabel nog leeg is,
    zodat producten niet dubbel worden toegevoegd.
    """

    # Maak verbinding met de database
    conn = get_db()

    # Controleer of de products-tabel al data bevat
    count = conn.execute(
        "SELECT COUNT(*) FROM products"
    ).fetchone()[0]

    if count > 0:
        conn.close()
        print("Producten zijn al aanwezig.")
        return

    # Pad naar products.json
    data_path = (
        Path(__file__).resolve().parent.parent
        / "data"
        / "products.json"
    )

    # Lees de producten uit het JSON-bestand
    with open(data_path, "r", encoding="utf-8") as file:
        products = json.load(file)

    # Voeg ieder product toe aan de database
    for product in products:
        conn.execute(
            """
            INSERT INTO products (
                id,
                title,
                description,
                price,
                category,
                image,
                rating_rate,
                rating_count
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                product["id"],
                product["title"],
                product["description"],
                product["price"],
                product["category"],
                product["image"],
                product["rating"]["rate"],
                product["rating"]["count"],
            ),
        )

    # Sla alle wijzigingen op
    conn.commit()

    # Sluit de databaseverbinding
    conn.close()

    print(f"{len(products)} producten toegevoegd.")