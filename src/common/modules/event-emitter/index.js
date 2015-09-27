var util = require('util');
var events = require('events');

var eventRepository = {
    'REQUEST_EXCEPTION': 'request.exception'
};

var AppEventEmitter = function () {

    this.emitRequestException = function (exception) {
        this.emit(eventRepository.REQUEST_EXCEPTION, exception);
    };

    this.onRequestException = function (handler) {
        this.on(eventRepository.REQUEST_EXCEPTION, handler);
    };
};

util.inherits(AppEventEmitter, events.EventEmitter);

module.exports = new AppEventEmitter();
