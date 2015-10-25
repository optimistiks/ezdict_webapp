var dispatcher = require('../../../common/modules/dispatcher');


var routeParamsActions = {

    change (params) {

        dispatcher.dispatch({
            eventName: 'route-params-change',
            params: params
        });

    }

};

module.exports = routeParamsActions;
