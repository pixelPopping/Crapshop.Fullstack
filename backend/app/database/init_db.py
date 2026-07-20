from pathlib import Path

from app.database.connection import get_db


def init_db():
    conn = get_db()

    schema = Path(__file__).with_name("schema.sql").read_text(
        encoding="utf-8"
    )

    conn.executescript(schema)

    conn.commit()
    conn.close()

    print("✅ Database succesvol geïnitialiseerd.")


if __name__ == "__main__":
    init_db()