from flask import Flask
from flask_cors import CORS

from config import Config

from .routes.products import products_bp
from .routes.auth import auth_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

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

    return app