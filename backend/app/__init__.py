import os

from flask import Flask, send_from_directory
from flask_cors import CORS

from .routes.orders import order_bp
from config import Config
from .routes.products import products_bp
from .routes.auth import auth_bp
from .routes.profile import profile_bp
from .routes.cart import cart_bp
from app.routes.payments import payment_bp


def create_app():
    app = Flask(__name__)

    # ==========================================
    # CONFIG
    # ==========================================

    app.config.from_object(Config)

    # ==========================================
    # CORS
    # ==========================================

    CORS(
        app,
        resources={
            r"/api/*": {
                "origins": "*"
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
        ]
    )

    # ==========================================
    # API ROUTES
    # ==========================================

    app.register_blueprint(
        products_bp,
        url_prefix="/api/products"
    )

    app.register_blueprint(
        auth_bp,
        url_prefix="/api/auth"
    )

    app.register_blueprint(
        profile_bp,
        url_prefix="/api/profile"
    )

    app.register_blueprint(
        cart_bp,
        url_prefix="/api/cart"
    )

    app.register_blueprint(
        order_bp,
        url_prefix="/api/orders"
    )

    app.register_blueprint(
        payment_bp,
        url_prefix="/api/payments"
    )

    # ==========================================
    # REACT FRONTEND
    # ==========================================

    frontend_dist = os.path.abspath(
        os.path.join(
            os.path.dirname(__file__),
            "../../dist"
        )
    )

    @app.route("/", defaults={"path": ""})
    @app.route("/<path:path>")
    def serve_frontend(path):

        # Laat API-routes door Flask behandelen
        if path.startswith("api/"):
            return {
                "error": "API route not found",
                "path": f"/{path}"
            }, 404

        # Controleer of het gevraagde bestand bestaat
        file_path = os.path.join(
            frontend_dist,
            path
        )

        if path and os.path.isfile(file_path):
            return send_from_directory(
                frontend_dist,
                path
            )

        # React Router fallback
        index_path = os.path.join(
            frontend_dist,
            "index.html"
        )

        if os.path.isfile(index_path):
            return send_from_directory(
                frontend_dist,
                "index.html"
            )

        return {
            "error": "Frontend not found",
            "frontend_dist": frontend_dist
        }, 404

    # ==========================================
    # DEBUG ROUTES
    # ==========================================

    @app.route("/health")
    def health():
        return {
            "status": "ok",
            "message": "CrapShop backend is running"
        }

    # ==========================================
    # DEBUG
    # ==========================================

    print("\n========== GEREGISTREERDE ROUTES ==========")

    for rule in app.url_map.iter_rules():
        print(
            f"{rule.endpoint:30} -> {rule}"
        )

    print("==========================================\n")

    return app