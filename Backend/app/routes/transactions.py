from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Transaction, User
from app.extensions import db
from app.routes import transaction_bp
from datetime import datetime

@transaction_bp.route('/', methods=['POST'])
@jwt_required()
def add_transaction():
    data = request.get_json()
    amount = data.get('amount')
    description = data.get('description')
    date = data.get('date', datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%S'))

    # Validate required fields
    if amount is None or not description:
        return jsonify({"message": "Amount and description are required!"}), 400

    # Validate date format
    try:
        date = datetime.fromisoformat(date).isoformat()
    except ValueError:
        return jsonify({"message": "Invalid date format!"}), 400

    user_id = get_jwt_identity()
    transaction = Transaction(
        amount=amount,
        description=description,
        date=date,
        user_id=user_id
    )

    try:
        db.session.add(transaction)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Database error!", "error": str(e)}), 500

    return jsonify({
        "message": "Transaction added successfully!",
        "transaction": {
            "id": transaction.id,
            "amount": transaction.amount,
            "description": transaction.description,
            "date": transaction.date
        }
    }), 201

@transaction_bp.route('/', methods=['GET'])
@jwt_required()
def get_transactions():
    user_id = get_jwt_identity()
    transactions = Transaction.query.filter_by(user_id=user_id).all()

    return jsonify([{
        "id": t.id,
        "amount": t.amount,
        "description": t.description,
        "date": t.date
    } for t in transactions]), 200

@transaction_bp.route('/<int:transaction_id>', methods=['PUT'])
@jwt_required()
def update_transaction(transaction_id):
    data = request.get_json()
    user_id = get_jwt_identity()

    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return jsonify({"message": "Transaction not found!"}), 404

    transaction.amount = data.get('amount', transaction.amount)
    transaction.description = data.get('description', transaction.description)

    # Validate and update date
    if 'date' in data:
        try:
            transaction.date = datetime.fromisoformat(data['date']).isoformat()
        except ValueError:
            return jsonify({"message": "Invalid date format!"}), 400

    try:
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Database error!", "error": str(e)}), 500

    return jsonify({"message": "Transaction updated successfully!"}), 200

@transaction_bp.route('/<int:transaction_id>', methods=['DELETE'])
@jwt_required()
def delete_transaction(transaction_id):
    user_id = get_jwt_identity()

    transaction = Transaction.query.filter_by(id=transaction_id, user_id=user_id).first()

    if not transaction:
        return jsonify({"message": "Transaction not found!"}), 404

    try:
        db.session.delete(transaction)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Database error!", "error": str(e)}), 500

    return jsonify({"message": "Transaction deleted successfully!"}), 200
