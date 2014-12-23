define(['serverSetup','actions/UserActions'], function(apiUrl, UserActions){

  var UserUtils = {

    logIn: function(){
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
                   UserActions.recieveUserId(data);
                   document.location.href="/";
                }).fail(function(data){
                   console.log(data.statusText);
                });
             }
          );
       } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    }, {scope: 'email,user_birthday,user_events,rsvp_event', return_scopes: true});
  },

  logOut: function() {
    //Log Out of FB
    FB.logout(function(response) {
      UserActions.deleteUserId();
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

  };

  return UserUtils;

});


