define(['react', 'jquery', 'jquery-cookie', 'utils/GroupWebAPIUtils', 'utils/EventWebAPIUtils'], function(React, $, cookie, GroupAPI, EventAPI){
  function loadDataOnLogin()
  {
    GroupAPI.retrieveSubscribedGroups();
    EventAPI.retrieveEvents();

  }

  function logIn(callback){
      FB.login(function(response) {
        if (response.authResponse) {
          //Setting Cookie
          var date = new Date();
          date.setTime(date.getTime() + (10800000)); // 3 hours
          $.cookie('access_token', response.authResponse.accessToken,{ expires: date, path: '/' });

          localStorage.setItem('fb_id', response.authResponse.userID);
          FB.api('/me', 
             {fields: "id,about,picture.type(large).width(300),birthday,age_range,email,first_name,last_name,gender,hometown,location,locale,name,timezone"}, 
             function(response) {
                // Setting Client's localStorage
                localStorage.setItem('email', response.email);
                localStorage.setItem('name', response.name);
                localStorage.setItem('first_name', response.first_name);
                localStorage.setItem('last_name', response.last_name);
                localStorage.setItem('gender', response.gender);
                localStorage.setItem('timezone', response.timezone);
                localStorage.setItem('profilePic', response.picture.data.url);
                localStorage.setItem('birthday', response.birthday);
                localStorage.setItem('age_range', response.age_range.min);
                //Send Data Back to Server
                 $.ajax({
                  url: '/api/v0/users/sessioning_user',
                  dataType: 'json',
                  type: 'POST',
                  data: localStorage
                }).success(function(data){
                   localStorage.setItem('userId', data);

                   //Load all data that can now be loaded from server b/c user is logged in
                   loadDataOnLogin();

                   callback(true);
                }).fail(function(data){
                   console.log(data.statusText);
                   callback(false);
                });
             }
          );
       } else {
        console.log('User cancelled login or did not fully authorize.');
        callback(false);
      }
    }, {scope: 'email,user_birthday,user_events,rsvp_event', return_scopes: true});
  }

    var LogInButton = React.createClass({
      getInitialState: function() {
        if (localStorage.getItem('userId')) {
          loadDataOnLogin();
          return {loggedIn: true};
        } else {
          return {loggedIn: false};
        }
      },

      FBlogin: function(callback) {
        var that = this;
        FB.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            logIn(function(result){
              that.setState({loggedIn: result});
            });
          } else {
            logIn(function(result){
              that.setState({loggedIn: result});
            });
          }
        });
      },

      FBlogout: function(callback) {
        //Log Out of FB
        FB.logout(function(response) {
          // callback(false);
          this.setState({loggedIn: false});
        }), {access_token: $.cookie('access_token')};
        // Clearing Server
        $.ajax({
          url: '/api/v0/users/clear_session'
        });
        // Clear Client
        localStorage.clear();
        document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.location.href="/";
      },

      render: function() {
        if (this.state.loggedIn) {
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