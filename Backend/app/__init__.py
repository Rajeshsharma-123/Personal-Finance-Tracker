from flask import Flask
from app.extensions import db, bcrypt, jwt
from app.config import Config
from app.routes import auth_bp, transaction_bp,home_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    jwt.init_app(app)

    # Register blueprints   
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(transaction_bp, url_prefix="/transactions")
    app.register_blueprint(home_bp, url_prefix="/")

    return app
