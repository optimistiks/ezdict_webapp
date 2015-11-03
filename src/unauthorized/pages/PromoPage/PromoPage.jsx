var React = require('react');

var t = require('../../../common/modules/t');


module.exports = React.createClass({

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="jumbotron">
                        <h1>{t('jumbotronHeader')}</h1>
                        <p>Персональный интерактивный словарь.</p>
                        <p>
                            <a className="btn btn-success btn-lg" href="#" role="button">{t('Register')}</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
});
