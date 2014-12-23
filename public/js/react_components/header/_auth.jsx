define(['react', 'jquery', 'jquery-cookie', 'utils/GroupWebAPIUtils', 'utils/UserUtils', 'stores/UserStore'], function(React, $, cookie, GroupAPI, UserUtils, UserStore){
  function loadDataOnLogin()
  {
    GroupAPI.retrieveSubscribedGroups();
    EventAPI.retrieveEvents();

  }
  function getStateFromStores(){
    return{
      UserId: UserStore.currentUser()
    };
  }

    var LogInButton = React.createClass({
      getInitialState: function() {
        return getStateFromStores();
      },
      componentDidMount: function() {
        UserStore.addChangeListener(this._onchange);
      },
      _onchange: function() {
        this.setState(getStateFromStores());
      },
      FBlogin: function() {
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            UserUtils.logIn();
          } else {
            UserUtils.logIn();
          }
        });
      },
      FBlogout: function() {
        UserUtils.logOut();
      },
      render: function() {
        if ($.cookie('access_token')) {
          return (
            <div>
              <UserPageButton />
              <button id='logInOut' onClick={this.FBlogout}>Log Out</button>
            </div>
          );
        } else {
          return (
            <button id='logInOut' onClick={this.FBlogin}>Log In</button>
          );
        };
      }

    });

    var UserPageButton = React.createClass({
      render: function() {
        return (
         <a href={"#/users/" + localStorage.getItem("userId")}>
           <img id="profilePic" src={localStorage.getItem('profilePic')} />
         </a>
        );
      }
    });
  
  return LogInButton

});