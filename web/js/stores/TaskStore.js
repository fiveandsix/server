var Dispatcher = require('../dispatcher/Dispatcher');
var handler = require('../dispatcher/handler');
var TaskConstants = require('../constants/TaskConstants');
var merge = require('react/lib/merge');
var lists = require('../lists');
var api = require('../api/api');
var _Change = require('./_Change');

var store = {
    tasks: []
};

var Store = merge(_Change, {
    tasks: function() {
        return store.tasks;
    }
});

var handle = handler();

handle(TaskConstants.LOAD, function(action) {
    api.tasks().then(
        function(response) {
            store.tasks = response.entity.tasks.map(function(task) {
                task.body = JSON.parse(task.body);
                return task;
            }).filter(function(task) {
                return task.state != 'deleted';
            });

            store.tasks.reverse();
            handler.dispatch(TaskConstants.LOADED);
            Store.emitChange();
        },
        function(error) {
            Store.emitChange();
        });
});

handle(TaskConstants.CREATE, function(action) {
    api.create_task(action.task).done(function() {
        handler.dispatch(TaskConstants.CREATE_DONE);
    });
});

handle(TaskConstants.CREATE_DONE, function(action) {
    handler.dispatch(TaskConstants.LOAD);
});

handle(TaskConstants.REMOVE, function(action) {
    api.remove_task(action.task_id).done(function() {
        handler.dispatch(TaskConstants.REMOVE_DONE);
    });
});

handle(TaskConstants.REMOVE_DONE, function(action) {
    handler.dispatch(TaskConstants.LOAD);
});


module.exports = Store;
