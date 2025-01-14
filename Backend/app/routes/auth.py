from flask import request, jsonify
from flask_jwt_extended import create_access_token
from app.models import User
from app.extensions import db, bcrypt
from app.routes import auth_bp

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(username=username).first():
        return jsonify({"message": "Username already exists!"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered!"}), 400

    new_user = User(username=username, email=email)
    new_user.password = password
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully!"}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        access_token = create_access_token(identity=str(user.id))
        return jsonify({"access_token": access_token}), 200

    return jsonify({"message": "Invalid credentials!"}), 401
