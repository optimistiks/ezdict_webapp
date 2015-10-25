var dispatcher = require('../../../common/modules/dispatcher');


var historyActions = {

    load () {

        dispatcher.dispatch({
            eventName: 'history-load'
        });

    }

};

module.exports = historyActions;
