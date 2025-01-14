from flask import Blueprint, jsonify

home_bp = Blueprint("home", __name__)

@home_bp.route("/")
def home():
    return jsonify({
        "message": "Welcome to the Personal Finance Tracker API!",
        "endpoints": {
            "auth_register": "/auth/register (POST)",
            "auth_login": "/auth/login (POST)",
            "transactions": "/transactions (GET/POST)"
        }
    }), 200
