//Returns: UsersContainer
//Description: A wrapper for the '/users' route so that you can easily nest routes below it (I.e. '/users/4' or '/users/calendar')
define(['react', 'react-router'], function(React, Router) {
  var RouteHandler = Router.RouteHandler;
  var UsersContainer = React.createClass({
    mixins: [Router.State],
    render: function() {
      return(
        <div>
        <RouteHandler loggedInUser={this.props.loggedInUser}/>
        </div>
        )
    }
  });
  return UsersContainer
});