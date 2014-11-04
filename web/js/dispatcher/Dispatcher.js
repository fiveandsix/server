var when = require('when');

var _callbacks = [];
var _promises = [];

/**
 * Add a promise to the queue of callback invocation promises.
 * @param {function} callback The Store's registered callback.
 * @param {object} payload The data from the Action.
 */
var _addPromise = function(callback, payload) {
    _promises.push(when.promise(function(resolve, reject) {
        if (callback(payload)) {
            resolve(payload);
        } else {
            reject(new Error('Dispatcher callback unsuccessful'));
        }
    }));
};

/**
 * Empty the queue of callback invocation promises.
 */
var _clearPromises = function() {
    _promises = [];
};

var Dispatcher = {

    /**
     * Register a Store's callback so that it may be invoked by an action.
     * @param {function} callback The callback to be registered.
     * @return {number} The index of the callback within the _callbacks array.
     */
    register: function(callback) {
        _callbacks.push(callback);
        return _callbacks.length - 1; // index
    },

    /**
     * dispatch
     * @param  {object} payload The data from the action.
     */
    dispatch: function(payload) {
        _callbacks.forEach(function(callback) {
            _addPromise(callback, payload);
        });
        when.all(_promises).then(_clearPromises);
    },

    handleViewAction: function(action) {
        this.dispatch({
            source: 'VIEW_ACTION',
            action: action
        });
    },

    handleServerAction: function(action) {
        this.dispatch({
            source: 'SERVER_ACTION',
            action: action
        });
    },

    waitFor: function(/*array*/ promiseIndexes, /*function*/ callback) {
        var selectedPromises = _promises.filter(function(/*object*/ _, /*number*/ j) {
            return promiseIndexes.indexOf(j) !== -1;
        });

        var callback1 = function() {
            try {
                callback();
            } catch(e) {
                console.error('Failed to execute callback',  e);
            }
        };

        when.all(selectedPromises).then(callback1);
    }

};

module.exports = Dispatcher;
