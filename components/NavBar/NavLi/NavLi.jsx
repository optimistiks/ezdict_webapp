var React = require('react');
var Router = require('react-router');
var Link = require('../../Link/Link.jsx');
var State = Router.State;

module.exports = React.createClass({

  mixins: [ State ],

  render: function () {
    var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
    var className = isActive ? 'active' : '';
    var link = (
      <Link {...this.props} />
    );
    return <li className={className}>{link}</li>;
  }

});
