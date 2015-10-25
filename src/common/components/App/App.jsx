var React = require('react');
var Router = require('react-router');
var NavBar = require('../../../navbar/components/NavBar/NavBar.jsx');
var appEventEmitter = require('../../../common/modules/event-emitter');
var t = require('../../../common/modules/t');
var routeParamsActions = require('../../modules/route-params-actions');


module.exports = React.createClass({

    getInitialState: function () {
        return {errors: []};
    },

    componentDidMount: function () {

        appEventEmitter.onRequestException(function (exception) {

            var errors = [];

            Object.keys(exception.error).forEach(function (key) {
                errors.push(exception.error[key]);
            }.bind(this));

            this.setState({
                errors: errors
            });

        }.bind(this));
    },

    clearErrors: function () {
        this.setState({errors: []});
    },

    componentWillMount () {
        routeParamsActions.change(this.props.params);
    },

    componentWillReceiveProps (nextProps) {
        routeParamsActions.change(nextProps.params);
    },

    render: function () {

        var errorsBlock = null;

        if (this.state.errors.length) {

            let errorNodes = this.state.errors.map(function (error) {
                return <p>{error}</p>
            });

            errorsBlock = (
                <div className="alert alert-danger" role="alert">
                    <button type="button" className="close" aria-label="Close">
                        <span aria-hidden="true" onClick={this.clearErrors}>&times;</span>
                    </button>
                    <p><strong>{t('errorPopupHeader')}</strong></p>
                    {errorNodes}
                </div>
            )
        }

        return (
            <div className="container-fluid">
                <NavBar/>
                {errorsBlock}
                {this.props.children}
                <hr/>
            </div>
        );
    }
});
