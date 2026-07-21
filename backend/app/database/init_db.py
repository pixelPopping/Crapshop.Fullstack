from pathlib import Path

from app.database.connection import get_db
from app.database.seed import seed_products


def init_database():
    """
    Initialiseert de database.

    - Maakt alle tabellen aan volgens schema.sql.
    - Vult de products-tabel met startdata.
    """

    # Open een databaseverbinding
    conn = get_db()

    # Locatie van het SQL-schema
    schema_path = Path(__file__).parent / "schema.sql"

    # Voer alle SQL-opdrachten uit
    with open(schema_path, "r", encoding="utf-8") as file:
        conn.executescript(file.read())

    # Sla de aangemaakte tabellen op
    conn.commit()

    # Sluit de verbinding
    conn.close()

    print("Database succesvol geïnitialiseerd.")

    # Vul de products-tabel met startdata
    seed_products()


if __name__ == "__main__":
    init_database()