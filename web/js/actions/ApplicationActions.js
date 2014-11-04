var Dispatcher = require('../dispatcher/Dispatcher');
var ApplicationConstants = require('../constants/ApplicationConstants');

module.exports = {
    set_page: function(page) {
        Dispatcher.handleViewAction({
            actionType: ApplicationConstants.SET_PAGE,
            page: page
        });
    },

    start: function() {
        Dispatcher.handleViewAction({
            actionType: ApplicationConstants.START
        });
    },

    login: function(username, password) {
        Dispatcher.handleViewAction({
            actionType: ApplicationConstants.LOGIN,
            username: username,
            password: password
        });
    },

    logout: function() {
        Dispatcher.handleViewAction({
            actionType: ApplicationConstants.LOGOUT
        });
    }
};
