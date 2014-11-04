from datetime import datetime
from flask import Blueprint, jsonify, request, abort
from flask.json import dumps
from flask.ext.login import login_required
from app import app
from app import db
from app.model import User, Task, Status, DeviceLogin, UsernameLogin, Log
from itsdangerous import TimestampSigner
from flask.ext.login import current_user, login_user, logout_user
from random import randint

api = Blueprint('api', __name__)

@api.route('/admin/tasks', methods=['GET'])
@login_required
def admin_tasks():
    result = []
    for task in Task.query.filter_by(team_id=1):
        result.append({
                'id': task.id,
                'kind': task.kind,
                'title': task.title,
                'state': task.state,
                'body': task.body
                })
    return jsonify({'tasks': result})

@api.route('/admin/task', methods=['POST'])
@login_required
def create_task():
    json = request.get_json()
    kind = request.json['kind']
    title = request.json['title']
    if kind == 'simple':
        description = request.json['description']
        instructions = request.json['instructions']
        task = Task(1, 'simple', title, dumps({'description': description, 'instructions':instructions}))
        db.session.add(task)
        db.session.commit()

        for user in User.query.all():
            # publish task
            status = Status(user, task, 'new')
            db.session.add(status)

            db.session.commit()
        return jsonify({'success': True})

@api.route('/admin/task/<int:task_id>', methods=['DELETE'])
@login_required
def remove_task(task_id):
    task = Task.query.get(task_id)
    task.state = 'deleted'

    for status in Status.query.filter_by(task_id=task_id):
        db.session.delete(status)

    db.session.commit()

    return jsonify({'success': 'ok'})

@api.route('/tasks', methods=['GET'])
@login_required
def tasks():
    result = []
    for status in Status.query.filter_by(user_id=current_user.id):
        result.append({
                'id': status.task.id,
                'kind': status.task.kind,
                'title': status.task.title,
                'body': status.task.body,
                'status': status.status
                })

    return jsonify({'tasks': result})

@api.route('/done', methods=['POST'])
@login_required
def done():
    status_id = int(request.form['task_id'])
    status = Status.query.get((current_user.id, status_id))
    log = Log(status.task.kind, status.task.title)
    status.status = 'new'
    db.session.add(log)
    db.session.commit()
    return jsonify({'id': log.id, 'date': log.created.strftime('%d/%m/%Y'), 'kind': log.kind, 'text': log.text})

@api.route('/todo', methods=['POST'])
@login_required
def todo():
    status_id = int(request.form['task_id'])
    status = Status.query.get((current_user.id, status_id))
    status.status = 'todo'
    db.session.commit()
    return jsonify({'success': True})

@api.route('/delete', methods=['POST'])
@login_required
def delete():
    status_id = int(request.form['task_id'])
    status = Status.query.get((current_user.id, status_id))
    status.status = 'deleted'
    db.session.commit()
    return jsonify({'success': True})

@api.route('/register', methods=['POST'])
def register():
    device_id = request.form['id']
    device_login = DeviceLogin.query.get(device_id)
    if device_login:
        # already registered
        return jsonify({'success': False})
    user = User()
    db.session.add(user)
    db.session.commit()
    device_login = DeviceLogin(user, device_id)
    db.session.add(device_login)
    db.session.commit()

    # publish all tasks
    for task in Task.query.filter_by(team_id=1):
        # publish task
        status = Status(user, task, 'new')
        db.session.add(status)
    db.session.commit()

    return jsonify({'success': True})

@api.route('/login', methods=['POST'])
def login():
    method = request.form['method']
    if method == 'device':
        device_id = request.form['id']
        device_login = DeviceLogin.query.get(device_id)
        if device_login is None:
            abort(401)

        signer = TimestampSigner(app.secret_key)
        user_id = device_login.user.id
        token = signer.sign(str(user_id))

        return jsonify({'token': token})
    elif method == 'username':
        username = request.form['username']
        password = request.form['password']
        username_login = UsernameLogin.query.get(username)
        if username_login is None or username_login.password != password:
            abort(401)
        login_user(username_login.user)

        return jsonify({'success': True})

@api.route('/logout')
@login_required
def logout():
    logout_user()
    return jsonify({'success': True})

@api.route('/roles', methods=['GET'])
@login_required
def roles():
    return jsonify({'roles': []})
