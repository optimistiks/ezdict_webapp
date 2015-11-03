var React = require('react');
var Router = require('react-router');
var History = Router.History;
var CardList = require('../../components/CardList/CardList.jsx');
var Link = require('../../../common/components/Link/Link.jsx');
var t = require('../../../common/modules/t');
var store = require('../../../common/modules/route-params-store');


module.exports = React.createClass({

    mixins: [History],

    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.refs['cardText'].value;

        if (!text) {
            return;
        }

        this.history.pushState(null, `/${store.getLng()}/card/${text}`);
    },

    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="well">
                        <form className="form-inline" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label className="sr-only" htmlFor="cardText">{t('cardTextInputLabel')}</label>
                                <input type="text" className="form-control" id="cardText" ref="cardText"
                                       placeholder={t('cardTextInputLabel')}/>
                            </div>
                            &nbsp;
                            <button type="submit" className="btn btn-success">{t('createCardButtonText')}</button>
                        </form>
                    </div>
                    <CardList/>
                </div>
            </div>
        );
    }
});
