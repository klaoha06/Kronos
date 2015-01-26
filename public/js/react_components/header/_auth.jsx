define(['react', 'utils/UserUtils', 'actions/CalendarActions', 'react-router'], function(React, UserUtils, CalendarActions, Router){

    var Link = Router.Link

    var UserPageButton = React.createClass({
      render: function() {
        return (
         <Link to="UserPage" params={{id: this.props.loggedInUser}}>
           <img className="profilePic" src={JSON.parse(localStorage.getItem('userInfo')).profilePic} />
         </Link>
        );
      }
    });

    var LogInButton = React.createClass({
      mixins: [ Router.Navigation ],
      FBlogin: function(evt) {
        evt.preventDefault();
            UserUtils.logIn();
      },
      FBlogout: function() {
        UserUtils.logOut();
        this.transitionTo('/')
      },
      render: function() {
        return( 
          <div>
          {this.props.loggedInUser ? 
            (<div>
              <UserPageButton loggedInUser={this.props.loggedInUser} />
              <button id='logInOut' onClick={this.FBlogout}>Log Out</button></div>) : 
            (<button id='logInOut' onClick={this.FBlogin}>Log In</button>)
          }
          </div>
        )
      }
    });

  return LogInButton
});