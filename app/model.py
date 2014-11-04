from datetime import datetime
from app import db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.BigInteger, primary_key=True)
    created = db.Column(db.DateTime)

    def __init__(self):
        self.created = datetime.utcnow()

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return unicode(self.id)

    def __repr__(self):
        return '<User %r>' % (self.id)

class Team(db.Model):
    __tablename__ = 'team'
    id = db.Column(db.BigInteger, primary_key=True)
    name = db.Column(db.String(64))

    def __init__(self, name):
        self.name = name

class Status(db.Model):
    __tablename__ = 'status'
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'), primary_key=True)
    task_id = db.Column(db.BigInteger, db.ForeignKey('tasks.id'), primary_key=True)
    status = db.Column(db.String(16))
    user = db.relationship('User', uselist=False)
    task = db.relationship('Task', uselist=False)

    def __init__(self, user, task, status):
        self.user = user
        self.task = task
        self.status = status

class Task(db.Model):
    __tablename__ = 'tasks'
    __table_args__ = {'mysql_engine': 'InnoDB', 'mysql_charset': 'utf8'}
    id = db.Column(db.BigInteger, primary_key=True)
    team_id = db.Column(db.BigInteger, db.ForeignKey('team.id'))
    kind = db.Column(db.String(32))
    state = db.Column(db.String(16))
    title = db.Column(db.Unicode(128))
    body = db.Column(db.UnicodeText())
    created = db.Column(db.DateTime)

    def __init__(self, team_id, kind, title, body, state='new'):
        self.team_id = team_id
        self.kind = kind
        self.title = title
        self.body = body
        self.state = state
        self.created = datetime.utcnow()

class Log(db.Model):
    __tablename__ = 'log'
    __table_args__ = {'mysql_engine': 'InnoDB', 'mysql_charset': 'utf8'}
    id = db.Column(db.BigInteger, primary_key=True)
    kind = db.Column(db.String(32))
    text = db.Column(db.Unicode(256))
    created = db.Column(db.DateTime)

    def __init__(self, kind, text):
        self.kind = kind
        self.text = text
        self.created = datetime.utcnow()

class Changelog(db.Model):
    __tablename__ = 'changelog'
    id = db.Column(db.BigInteger, primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    task_id = db.Column(db.BigInteger, db.ForeignKey('tasks.id'), primary_key=True)
    status = db.Column(db.String(16))
    created = db.Column(db.DateTime)
    user = db.relationship('User', uselist=False)
    task = db.relationship('Task', uselist=False)

    def __init__(self, status, user_id):
        self.user_id = user_id
        self.task_id = task_id
        self.status = status
        self.created = datetime.utcnow()

class DeviceLogin(db.Model):
    __tablename__ = 'device_login'
    device_id = db.Column(db.String(64), primary_key=True)
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    user = db.relationship('User', uselist=False)
    created = db.Column(db.DateTime)

    def __init__(self, user, device_id):
        self.device_id = device_id
        self.user = user
        self.created = datetime.utcnow()

class UsernameLogin(db.Model):
    __tablename__ = 'username_login'
    username = db.Column(db.String(64), primary_key=True)
    password = db.Column(db.String(64))
    user_id = db.Column(db.BigInteger, db.ForeignKey('users.id'))
    user = db.relationship('User', uselist=False)
    created = db.Column(db.DateTime)

    def __init__(self, user, username, password):
        self.username = username
        self.password = password
        self.user = user
        self.created = datetime.utcnow()
