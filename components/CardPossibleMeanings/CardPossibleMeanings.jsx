var React = require('react');

module.exports = React.createClass({

    mixins: [],

    render: function () {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">
                    <h3 className="panel-title">Возможные значения <strong>{this.props.text}</strong></h3>
                </div>
                <div className="panel-body">
                    <p>...</p>
                </div>

                <ul className="list-group">
                    <a href="#" className="list-group-item">Dapibus ac facilisis in</a>
                    <a href="#" className="list-group-item">Morbi leo risus</a>
                    <a href="#" className="list-group-item">Porta ac consectetur ac</a>
                    <a href="#" className="list-group-item">Vestibulum at eros</a>
                </ul>
            </div>
        );
    }
});
