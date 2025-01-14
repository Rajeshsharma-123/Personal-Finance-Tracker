from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')
transaction_bp = Blueprint('transaction', __name__, url_prefix='/transactions')

from app.routes import auth, transactions
from app.routes.auth import auth_bp
from app.routes.transactions import transaction_bp
from app.routes.home import home_bp
