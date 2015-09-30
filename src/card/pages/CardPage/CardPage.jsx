var React = require('react');
var Router = require('react-router');
var Navigation = Router.Navigation;
var State = Router.State;
var AuthCheck = require('../../../common/mixins/AuthCheck');
var CardList = require('../../components/CardList/CardList.jsx');
var Link = require('../../../common/components/Link/Link.jsx');
var t = require('../../../common/modules/t');


module.exports = React.createClass({

    mixins: [AuthCheck, Navigation, State],

    handleSubmit: function (e) {
        e.preventDefault();
        var text = this.refs['cardText'].getDOMNode().value;
        var params = this.getParams();
        params['id'] = text;
        this.transitionTo('card-form', params);
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
