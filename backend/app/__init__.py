from flask import Flask
from flask_cors import CORS

from config import Config

from .routes.products import products_bp
from .routes.auth import auth_bp
from .routes.profile import profile_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    # CORS voor React frontend
    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "http://localhost:5173"
            }
        },
        allow_headers=[
            "Content-Type",
            "Authorization"
        ],
        methods=[
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "OPTIONS"
        ],
        supports_credentials=True
    )

    # Product routes
    app.register_blueprint(
        products_bp,
        url_prefix="/api/products"
    )

    # Authenticatie routes
    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    # Profiel routes
    app.register_blueprint(
        profile_bp,
        url_prefix="/api/profile"
    )

    print(app.url_map)

    print("\n========== GEREGISTREERDE ROUTES ==========")
    for rule in app.url_map.iter_rules():
        print(f"{rule.endpoint:30} -> {rule}")
    print("==========================================\n")

    return app