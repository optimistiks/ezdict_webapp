var React = require('react');
var AuthCheck = require('../../../common/mixins/AuthCheck');
var CardList = require('../../components/CardList/CardList.jsx');
var Link = require('../../../common/components/Link/Link.jsx');
var t = require('../../../common/modules/t');


module.exports = React.createClass({
    mixins: [AuthCheck],
    render: function () {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <div className="well">
                        <form className="form-inline">
                            <div className="form-group">
                                <label className="sr-only" for="cardText">{t('cardTextInputLabel')}</label>
                                <input type="text" className="form-control" id="cardText"
                                       placeholder={t('cardTextInputLabel')}/>
                            </div>
                            &nbsp;<button type="submit" className="btn btn-default">{t('createCardButtonText')}</button>
                        </form>
                    </div>
                    <CardList/>
                </div>
            </div>
        );
    }
});
