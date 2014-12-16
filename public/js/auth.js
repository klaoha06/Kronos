define(['react', 'jquery', 'jquery-cookie'], function(React, $, cookie){

  function logIn(callback){
      FB.login(function(response) {
        if (response.authResponse) {

          var date = new Date();
          var minutes = 180; // 3 hours
          date.setTime(date.getTime() + (minutes * 60 * 1000));

          $.cookie('access_token', response.authResponse.accessToken,{ expires: date, path: '/' });
          
          localStorage.setItem('loggedInTime', now);
          localStorage.setItem('fb_id', response.authResponse.userID);
         
          FB.api('/me', 
             {fields: "id,about,picture.type(large).width(300),birthday,email,first_name,last_name,gender,hometown,link,location,name,timezone"}, 
             function(response) {
                // Setting Client's localStorage
                localStorage.setItem('email', response.email);
                localStorage.setItem('name', response.name);
                localStorage.setItem('first_name', response.first_name);
                localStorage.setItem('last_name', response.last_name);
                localStorage.setItem('gender', response.gender);
                localStorage.setItem('timezone', response.timezone);
                localStorage.setItem('profilePic', response.picture.data.url);

                //Send Data Back to Server
                 $.ajax({
                  url: '/api/v0/users/sessioning_user',
                  dataType: 'json',
                  type: 'POST',
                  data: localStorage
                }).success(function(data){
                   localStorage.setItem('userId', data);
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
    }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
  }

  return {

    getCookie: $.cookie,

    FBlogin: function(callback) {
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          logIn(callback);
        } else {
          logIn(callback);
        }
      });
    },

    FBlogout: function(callback) {
      //Log Out of FB
      FB.logout(function(response) {
        callback(false);
      }), {access_token: $.cookie('access_token')};
      // Clearing Server
      $.ajax({
        url: '/api/v0/users/clear_session'
      });
      // Clear Client
      localStorage.clear();
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.location.href="/";
    }
  };
});