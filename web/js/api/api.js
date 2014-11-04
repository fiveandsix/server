var rest = require('rest');
var mime = require('rest/interceptor/mime');
var mimeRegistry = require('rest/mime/registry');
var errorCode = require('rest/interceptor/errorCode');
var application_form_urlencoded = require('rest/mime/type/application/x-www-form-urlencoded');

mimeRegistry.register('application/x-www-form-urlencoded', application_form_urlencoded);

var client = rest.wrap(mime).wrap(errorCode);

exports.roles = function() {
  return client('/api/v1/roles');
};

exports.login = function(username, password) {
    return client({
        path: '/api/v1/login',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        entity: {method: 'username', username: username, password: password}
    });
};

exports.logout = function() {
  return client('/api/v1/logout');
};

exports.tasks = function() {
    return client({
        path: '/api/v1/admin/tasks',
        method: 'GET'
    });
};

exports.create_task = function(task) {
    return client({
        path: '/api/v1/admin/task',
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        entity: task
    });
};

exports.remove_task = function(task_id) {
    return client({
        path: '/api/v1/admin/task/' + task_id,
        method: 'DELETE'
    });
};
