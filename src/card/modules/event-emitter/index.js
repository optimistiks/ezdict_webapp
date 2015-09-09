var util = require('util');
var events = require('events');

var eventRepository = {
    'POSSIBLE_MEANING_CLICK': 'possibleMeaning.click',
    'POSSIBLE_MEANING_ADD': 'possibleMeaning.add'
};

var CardEventEmitter = function () {

    this.emitPossibleMeaningClick = function (meaning) {
        this.emit(eventRepository.POSSIBLE_MEANING_CLICK, meaning);
    };

    this.onPossibleMeaningClick = function (handler) {
        this.on(eventRepository.POSSIBLE_MEANING_CLICK, handler);
    };

    this.emitMeaningAddToCard = function (meaning) {
        this.emit(eventRepository.POSSIBLE_MEANING_ADD, meaning);
    };

    this.onMeaningAddToCard = function (handler) {
        this.on(eventRepository.POSSIBLE_MEANING_ADD, handler);
    }
};

// extend the EventEmitter class using our CardEventEmitter class
util.inherits(CardEventEmitter, events.EventEmitter);

module.exports = new CardEventEmitter();
