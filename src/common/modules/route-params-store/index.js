var EventEmitter = require('events').EventEmitter;
var dispatcher = require('../../../common/modules/dispatcher');


var routeParamsStore = Object.assign({}, EventEmitter.prototype, {

    params: {},

    getLng () {
        return this.params.lng;
    },

    setParams (params) {
        this.params = params;
        this.emit('change');
    }

});

dispatcher.register(function (payload) {

    switch (payload.eventName) {

        case 'route-params-change':
            routeParamsStore.setParams(payload.params);
            break;

    }
    return true; // Needed for Flux promise resolution
});

routeParamsStore.setMaxListeners(0);

module.exports = routeParamsStore;
