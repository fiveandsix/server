var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/TaskConstants');

module.exports = {
    load: function() {
        Dispatcher.handleViewAction({
            actionType: Constants.LOAD
        });
    },

    create_task: function(task) {
        Dispatcher.handleViewAction({
            actionType: Constants.CREATE,
            task: task
        });
    },

    remove_task: function(task) {
        Dispatcher.handleViewAction({
            actionType: Constants.REMOVE,
            task_id: task.id
        });
    }

};
