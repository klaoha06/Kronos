define(['react', 'jquery'], function(React, $){
  // Load FB SDK
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '751003924936029',
      xfbml      : true,
      version    : 'v2.1',
      status     : true
    });
  };
  (function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "js/vendor/fb_sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }

  function logIn(callback){
      FB.login(function(response) {
        if (response.authResponse) {
          var now = Date.now();
          now += 10800000;
          document.cookie = 'access_token=' + response.authResponse.accessToken + '; expires=' + now + ';';
         
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

   getCookie: getCookie,

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
          }), {access_token: getCookie('access_token')};
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