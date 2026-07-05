from flask import Flask
from flask_cors import CORS

from config import Config
from .routes.products import products_bp


def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)

    """
    ROUTE REGISTRATIE

    Doel:
    Registreert alle productroutes.
    """
    app.register_blueprint(
        products_bp,
        url_prefix="/api/products"
    )

    
    return app