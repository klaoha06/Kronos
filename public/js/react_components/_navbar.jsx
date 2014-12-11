define(['react', 'jquery', 'bluebird', 'react-router', '../serverUrl'], function(React, $, Bluebird, Router, api){
	var Link = Router.Link
	var Navbar = React.createClass({
	  render: function() {
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

	    // Setup Ajax call (all ajax call will be authenticated)
	    $.ajaxSetup({
	        beforeSend: function(xhr) {

	        	if (Date.now() - localStorage.getItem('loggedInTime') < 10800000) {
	            xhr.setRequestHeader('access_token', getCookie('access_token'));
	        	} else {
	        		localStorage.clear();
	        		console.log("can't send data before login");
	        		// this.FBlogout;
	        		// this.FBlogin;
	        	}
	        }
	    });

	    return (
	      <div id="navbar">
	        <input id="search" type="text" />
	        <Link to="Main">Home</Link>
	        <div id="console">
	          <Authentication />
	        </div>
	      </div>
	    );

	  }
	});

	var Authentication = React.createClass({

	  getInitialState: function() {
	    if (localStorage.getItem('profilePic')) {
	      return {loggedIn: true};
	    } else {
	      return {loggedIn: false};
	    };
	  },

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

	      that.setState({loggedIn: true});

	    } else {
	      console.log('User cancelled login or did not fully authorize.');
	      that.setState({loggedIn: false});
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
	  this.setState({loggedIn: false});

	  //Log Out of FB
	  FB.logout(function(response) {
	    // console.log(response);
	  }), {access_token: localStorage.getItem('access_token')};

	  // Clear localStorage
	  localStorage.clear();
	},

	  render: function() {
	    if (this.state.loggedIn) {
	      return (
	        <div>
	          <ProfilePic />
	          <button onClick={this.FBlogout}>Log Out</button>
	        </div>
	      );
	    } else {
	      return (
	        <button onClick={this.FBlogin}>Log In</button>
	      );
	    };
	  }
	});

	var ProfilePic = React.createClass({
	  render: function() {
	    return (
	      <img id="profilePic" src={localStorage.getItem('profilePic')} />
	    );
	  }
	});

	return Navbar;

});