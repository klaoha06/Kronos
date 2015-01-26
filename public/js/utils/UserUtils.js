define(['jquery', 'jquery-cookie','actions/UserServerActions', 'actions/CalendarActions', 'react-router'], function($, cookie, UserActions, CalendarActions, Router){

  var UserUtils = {
    logIn: function(){
      that = this;
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
                var userInfo = {
                  email: response.email,
                  name: response.name,
                  first_name: response.first_name,
                  last_name: response.last_name,
                  gender: response.gender,
                  timezone: response.timezone,
                  profilePic: response.picture.data.url,
                  birthday: response.birthday,
                  age_range: response.age_range.min
                }
                //FJ -- As per http://jsperf.com/localstorage-setting-multiple-keys-vs-1-big-collection/2
                //It's a bit faster to just store all as one JSON object rather than many calls to localStorage
                localStorage.setItem('userInfo', JSON.stringify(userInfo))

                // localStorage.setItem('email', response.email);
                // localStorage.setItem('name', response.name);
                // localStorage.setItem('first_name', response.first_name);
                // localStorage.setItem('last_name', response.last_name);
                // localStorage.setItem('gender', response.gender);
                // localStorage.setItem('timezone', response.timezone);
                // localStorage.setItem('profilePic', response.picture.data.url);
                // localStorage.setItem('birthday', response.birthday);
                // localStorage.setItem('age_range', response.age_range.min);
                //Send Data Back to Server
                that.loginToServer();
             }
          );
         } 
        else 
          console.log('User cancelled login or did not fully authorize.');
        
      }, {scope: 'email,user_birthday,user_events,rsvp_event', return_scopes: true});
    },
    loginToServer: function(){
        var userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.fb_id = localStorage.getItem('fb_id');
         $.ajax({
          url: API_URL + '/users/sessioning_user',
          dataType: 'json',
          type: 'POST',
          data: userInfo
        }).success(function(data){
          var date = new Date();
          date.setTime(date.getTime() + (10800000)); // 3 hours
          $.cookie('user_id'  , data,{ expires: date, path: '/' });
          UserActions.recieveUserId(data);
          this.loadEventsFromFB();

        }.bind(this)).fail(function(data){
          console.log(data.statusText);
          this.clearClient();

        }.bind(this))
    },
    loadEventsFromFB: function() {
      var that = this;
      FB.api(
          "me/events?fields=name,cover,start_time,end_time,timezone,location,rsvp_status,description,feed_targeting,owner&limit=30",
          function (response) {
            if (response && !response.error) 
            {
              $.ajax({
                url: API_URL + '/users/' + $.cookie('user_id') +'/events/provider',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify({ events_data: response.data, provider: "FB"})
              }).success(function(data){
                CalendarActions.addOrUpdateCal(data);
              }).fail(function(data){
                console.log(data.statusText);
              });
            } 
            else 
            {
              console.log(response.error.message);
              that.clearClient();
            }
          }
      );
    },
    unfollow: function(user_id){
      $.ajax({
        url: API_URL + '/users/' + user_id + '/unfollow',
        type: 'POST'
      }).done(function(data){
        UserActions.unfollowCompleted(data)
      }).fail(function(data){
        UserActions.unfollowFailed(data)
      })
    },
    follow: function(user_id){
      $.ajax({
        url: API_URL + '/users/' + user_id + '/follow',
        type: 'POST'
      }).done(function(data){
        UserActions.followCompleted(data);
      }).fail(function(data){
        UserActions.followFailed(data);
      })
    },
    clearClient: function(){
      localStorage.clear();
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      UserActions.deleteUserId();
    },
    logOut: function() {
      //Log Out of FB
      var that=this;
      FB.logout(function(response) {
        that.clearClient();
      }), {access_token: $.cookie('access_token')};
      // Clearing Server
      $.ajax({
        url: API_URL + '/users/clear_session'
      });    
    }
  };

  return UserUtils;

});


