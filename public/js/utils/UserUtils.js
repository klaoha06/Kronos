define(['jquery', 'jquery-cookie', 'serverSetup','actions/UserServerActions', 'actions/CalendarActions'], function($, cookie, apiUrl, UserActions, CalendarActions){
  function loadEventsFromFB() {
    FB.api(
        "me/events?fields=name,cover,start_time,end_time,timezone,location,rsvp_status,description,feed_targeting,owner&limit=30",
        function (response) {
          if (response && !response.error) {
            $.ajax({
              url: apiUrl + '/users/' + $.cookie('user_id') +'/events/provider',
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({ events_data: response.data, provider: "FB"})
            }).success(function(data){
              CalendarActions.addOrUpdateCal(data);
            }).fail(function(data){
              console.log(data.statusText);
            });
          } else {
            console.log(response.error.message);
            localStorage.clear();
            document.location.href="/";
            alert('You session has timed out or you are not logged in FB please log in')
          }
        }
    );
  }

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
                  url: apiUrl + '/users/sessioning_user',
                  dataType: 'json',
                  type: 'POST',
                  data: localStorage
                }).success(function(data){
                   $.cookie('user_id', data,{ expires: date, path: '/' });
                   loadEventsFromFB();
                   UserActions.recieveUserId(data);
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
        url: apiUrl + '/users/clear_session'
      });
      // Clear Client
      localStorage.clear();
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.cookie = "user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
      document.location.href="/";
    },

    getAllFriendships: function(user_id){
      $.ajax({
        url: apiUrl + '/users/' + user_id + '/friendships'
      }).done(function(data){
        UserActions.loadFriendships(data)
      }).fail(function(data){
        console.log('Failed to get friendships.');
      })

    },

    unfollow: function(user_id){
      $.ajax({
        url: apiUrl + '/users/' + user_id + '/unfollow',
        type: 'POST'
      }).done(function(data){
        UserActions.unfollowCompleted(data)
      }).fail(function(data){
        UserActions.unfollowFailed(data)
      })
    },

    follow: function(user_id){
      $.ajax({
        url: apiUrl + '/users/' + user_id + '/follow',
        type: 'POST'
      }).done(function(data){
        UserActions.followCompleted(data);
      }).fail(function(data){
        UserActions.followFailed(data);
      })
    }

  };

  return UserUtils;

});

