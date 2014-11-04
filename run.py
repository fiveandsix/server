#!/usr/bin/python
from app import app

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=8080)
else:
  from werkzeug.contrib.fixers import ProxyFix
  app.app = ProxyFix(app.app)
