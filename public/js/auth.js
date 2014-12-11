define(['react', 'jquery'], function(React, $){
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
       localStorage.setItem('fb_id', response.authResponse.userID)
       
       var p1 = false;
    		      // Getting User's Info
              FB.api('/me', function(response) {
    	      		// console.log(response);
               localStorage.setItem('email', response.email);
               localStorage.setItem('name', response.name);
               p1 = true;
               finishLoading();
             })

              var p2 = false;
              FB.api('/me/picture', {type: 'large', width: '300'}, function(response) {
                localStorage.setItem('profilePic', response.data.url);
                p2 = true
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
                   console.log(data.statusText)
                 });
                 
               };
             };

    		      // that.setState({loggedIn: true});

            } else {
              console.log('User cancelled login or did not fully authorize.');
    		      // that.setState({loggedIn: false});
            }
          }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
},

FBlogout: function(e) {
    			// Log Out of Server
    			$.ajax({
    				url: '/api/v0/users/clear_session'
    				// ,
    				// dataType: 'text',
    				// success: function(data){
    				// 	console.log(data);
    				// },
    				// error: function(xhr) {
    				// 	console.log(xhr.statusText);
    				// }
    			});

    			// Change the State
          // this.setState({loggedIn: false});

    		  //Log Out of FB
    		  FB.logout(function(response) {
    		    // console.log(response);
          }), {access_token: localStorage.getItem('access_token')};

    		  // Clear localStorage
    		  localStorage.clear();
    		}

      };
    });