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
  
  return {
   FBlogin: function(e) {
    var that = this;

    FB.login(function(response) {
      if (response.authResponse) {

       var now = new Date();
       var time = now.getTime();
       time += 10800 * 1000;
       now.setTime(time);

       document.cookie = 
       'access_token=' + response.authResponse.accessToken + 
       '; expires=' + now.toUTCString() + 
       ';';

       localStorage.setItem('loggedInTime', Date.now());
       localStorage.setItem('fb_id', response.authResponse.userID);
       
       var p1 = false;
        // Getting User's Info
        FB.api('/me', function(response) {
      		// console.log(response);
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
           }).done(function(data){
             localStorage.setItem('userId', data);
           }).fail(function(data){
             console.log(data.statusText);
           });
         }
       }

     } else {
      console.log('User cancelled login or did not fully authorize.');
    }
  }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
},

FBlogout: function(e) {
    			// Log Out of Server
    			$.ajax({
    				url: '/api/v0/users/clear_session'
    			});
    		  //Log Out of FB
    		  FB.logout(function(response) {
    		    // console.log(response);
          }), {access_token: localStorage.getItem('access_token')};
    		  // Clear localStorage
    		  localStorage.clear();
    		}
      };
    });