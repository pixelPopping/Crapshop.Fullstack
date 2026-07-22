"""
USER SERVICE

Doel:
Bevat alle databasefuncties voor gebruikers.
"""

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