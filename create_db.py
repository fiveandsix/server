#!/usr/bin/python

import app
from app.model import Task, Team, User, UsernameLogin
app.db.drop_all()
app.db.create_all()

app.db.session.add(Team('default'))
user = User()
app.db.session.add(user)
app.db.session.commit()
app.db.session.add(UsernameLogin(user, 'admin', 'admin'))

#tasks = [
#    ('simple', 'Task 1', 'Alpha beta cappa'),
#    ('simple', 'Task 2', 'Alpha beta cappa'),
#    ('simple', 'Task 3', 'Alpha beta cappa'),
#    ('simple', 'Task 4', 'Alpha beta cappa'),
#    ('simple', 'Task 5', 'Alpha beta cappa'),
#    ('simple', 'Task 6', 'Alpha beta cappa'),
#    ('simple', 'Task 7', 'Alpha beta cappa'),
#    ('simple', 'Task 8', 'Alpha beta cappa')
#]

#for kind, title, body in tasks:
#    task = Task(kind, title, body)
#    #app.db.session.add(task)

app.db.session.commit()
