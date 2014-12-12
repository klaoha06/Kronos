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

  return {

   getCookie: getCookie,

   FBlogin: function(callback) {

    FB.login(function(response) {
      if (response.authResponse) {
       var now = Date.now();
       now += 10800000;
       document.cookie = 'access_token=' + response.authResponse.accessToken + '; expires=' + now + ';';
       
       localStorage.setItem('loggedInTime', now);
       localStorage.setItem('fb_id', response.authResponse.userID);
       
       var p1 = false;
        FB.api('/me', function(response) {
         localStorage.setItem('email', response.email);
         localStorage.setItem('name', response.name);
         p1 = true;
         finishLoading();
       });

       var p2 = false;
       FB.api('/me/picture', {type: 'large', width: '300'}, function(response) {
         localStorage.setItem('profilePic', response.data.url);
         p2 = true;
         finishLoading();
       });

        function finishLoading() {
          if (p1 === true && p2 === true) {
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
           });
         }
       }
     } else {
      console.log('User cancelled login or did not fully authorize.');
      callback(false);
    }
  }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
},

FBlogout: function() {
          //Log Out of FB
          FB.logout(function(response) {
          }), {access_token: getCookie('access_token')};
    			// Clearing Server
    			$.ajax({
    				url: '/api/v0/users/clear_session'
    			});
    		  // Clear Client
    		  localStorage.clear();
          document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    		}
      };
    });