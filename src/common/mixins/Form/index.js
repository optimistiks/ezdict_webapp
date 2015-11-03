var $ = require('jquery');
var ReactDOM = require('react-dom');


module.exports = {
    serializeAsKeyValue: function () {
        return $(ReactDOM.findDOMNode(this)).serializeArray().reduce(function (obj, formField) {
            obj[formField.name] = formField.value;
            return obj;
        }, {});
    }
};
