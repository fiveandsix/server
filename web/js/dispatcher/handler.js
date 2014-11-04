var Dispatcher = require('./Dispatcher');

var handler = function() {
    var handlers = {};

    Dispatcher.register(function(payload) {
        var action = payload.action;
        var handler = handlers[action.actionType];
        if(handler) {
            try {
                handler(action);
            } catch(e) {
                console.error('Failed to handle action', action, e);
            }
        }
        return true;
    });

    var handle = function(actionType, handler) {
        handlers[actionType] = handler;
    };

    return handle;
};

handler.dispatch = function(actionType) {
    Dispatcher.dispatch({action: {actionType: actionType}});
};

module.exports = handler;
