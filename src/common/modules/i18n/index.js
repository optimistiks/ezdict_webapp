var i18n = require('i18next-client');

i18n.init(
  {
    fallbackLng: false,
    ns: 'messages',
    resGetPath: '_locales/__lng__/__ns__.json'
  }
);

module.exports = i18n;
