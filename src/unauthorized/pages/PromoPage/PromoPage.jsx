var React = require('react');

var NonAuthCheck = require('../../../common/mixins/NonAuthCheck');
var t = require('../../../common/modules/t');


module.exports = React.createClass({
    mixins: [NonAuthCheck],

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="jumbotron">
                        <h1>{t('jumbotronHeader')}</h1>
                        <p>some cool text</p>
                        <ol>
                            <li>Установите расширение для вашего браузера.</li>
                            <li>Установите расширение для вашего браузера.</li>
                        </ol>
                        <p><a className="btn btn-info btn-lg" href="#" role="button">Learn more</a></p>
                    </div>
                </div>
            </div>
        );
    }
});
