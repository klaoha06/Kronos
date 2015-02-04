define([
  'react',
  'jquery',
  'react-router',
  'jsx!react_components/header/_auth',
  'jsx!react_components/events/_createEvent'],
  function(
    React,
    $,
    Router,
    Auth,
    CreateEvent
  ) {
  var Link = Router.Link;

  var Navbar = React.createClass({
    render: function() {
      if (this.props.loggedInUser) {
        var loginNav = (
          <div className="fl-r">
          </div>
        );
      } else {
        var loginNav = '';
      }
      return (
        <div id="navbar">
          <div className="fl-l">
            
            {loginNav}
          </div>
          <div id="console">
            {this.props.loggedInUser ? <CreateEvent /> : '' }
            <Auth loggedInUser={this.props.loggedInUser} />
          </div>
        </div>
      );
    }
  });
  return Navbar;
});
