var api = require('ezdict-api-client');
var config = require('../../config');
var storage = require('../token-storage');

api.config.setStorage(storage);
api.config.setLocale(config.defaultLng);
api.config.setHost(config.apiHost);
api.config.setProtocol(config.apiProtocol);

module.exports = api;
