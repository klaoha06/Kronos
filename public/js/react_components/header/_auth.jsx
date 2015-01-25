define(['react', 'utils/UserUtils', 'actions/CalendarActions', 'react-router'], function(React, UserUtils, CalendarActions, Router){

    var Link = Router.Link

    var UserPageButton = React.createClass({
      render: function() {
        return (
         <Link to="UserPage" params={{id: this.props.loggedInUser}}>
           <img className="profilePic" src={localStorage.getItem('profilePic')} />
         </Link>
        );
      }
    });

    var LogInButton = React.createClass({
      FBlogin: function(evt) {
        evt.preventDefault();
        // FB.getLoginStatus(function(response) {
          // if (response.status === 'connected') {
          //   UserUtils.logIn();
          // } else {
            UserUtils.logIn();
          // }
        // });
      },
      FBlogout: function() {
        UserUtils.logOut();
      },
      render: function() {
        if (this.props.loggedInUser) {
          return (
            <div>
              <UserPageButton loggedInUser={this.props.loggedInUser} />
              <button id='logInOut' onClick={this.FBlogout}>Log Out</button>
            </div>
          );
        } else {
          return (
            <div>
              <button id='logInOut' onClick={this.FBlogin}>Log In</button>
            </div>
          );
        };
      }
    });

  return LogInButton
});