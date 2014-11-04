var Dispatcher = require('../dispatcher/Dispatcher');
var handler = require('../dispatcher/handler');
var ApplicationConstants = require('../constants/ApplicationConstants');
var TaskConstants = require('../constants/TaskConstants');
var TaskActions = require('../actions/TaskActions');
var merge = require('react/lib/merge');
var lists = require('../lists');
var api = require('../api/api');
var _Change = require('./_Change');

var store = {
    state: 'LOADING',
    page: 'tasks'
};

var Store = merge(_Change, {
    state: function() {
        return store.state;
    },

    page: function() {
        return store.page;
    }
});

var handle = handler();

handle(ApplicationConstants.START, function(action) {
    api.roles().done(
        function(response) {
            console.log('got roles');
            TaskActions.load();
        },
        function(error) {
            if(error.status.code === 401) {
                store.state = 'LOGIN';
            } else {
                store.state = 'ERROR';
            }
            Store.emitChange();
        }
    );
});

handle(ApplicationConstants.LOGIN, function(action) {
    store.state = 'LOADING';
    Store.emitChange();
    api.login(action.username, action.password).done(
        function(response) {
            TaskActions.load();
        },
        function(error) {
            store.state = 'ERROR';
            Store.emitChange();
        }
    );
});

handle(ApplicationConstants.LOGOUT, function(action) {
    api.logout().done(
        function(response) {
            store.state = 'LOGIN';
            Store.emitChange();
        },
        function(error) {
            store.state = 'ERROR';
            Store.emitChange();
        }
    );
});


handle(TaskConstants.LOADED, function(action) {
    store.state = 'STARTED';
    Store.emitChange();
});

handle(ApplicationConstants.SET_PAGE, function(action) {
    store.page = action.page;
    Store.emitChange();
});

module.exports = Store;
