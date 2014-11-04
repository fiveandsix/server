from app import app
from app.model import User, DeviceLogin
from itsdangerous import TimestampSigner

def load_user_from_request(request):
    authorization = request.headers.get('Authorization')
    if authorization is None or not authorization.startswith('Bearer '):
        return None
    token = authorization.split(' ', 1)[-1]
    signer = TimestampSigner(app.secret_key)
    id = signer.unsign(token)
    user = User.query.get(int(id))
    return user

def load_user_from_id(id):
    user = User.query.get(int(id))
    return user
