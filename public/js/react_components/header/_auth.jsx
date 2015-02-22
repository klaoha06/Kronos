define([
  'react',
  'utils/UserUtils',
  'actions/CalendarActions',
  'react-router'],
  function(
    React,
    UserUtils,
    CalendarActions,
    Router
    ) {

  var LogInButton = React.createClass({
    mixins: [ Router.Navigation ],
    FBlogin: function(evt) {
      evt.preventDefault();
      UserUtils.logIn();
    },
    FBlogout: function() {
      UserUtils.logOut();
      this.transitionTo('/');
    },
    render: function() {
      if (this.props.loggedInUser) {
        var loginHeader = (
          <div>
            <button id='logInOut' onClick={this.FBlogout}>Log Out</button>
          </div>
        );
      } else {
        var loginHeader = (<button id='logInOut' onClick={this.FBlogin}>Log In</button>);
      }
      return (<div>{loginHeader}</div>);
    }
  });
  return LogInButton
});
