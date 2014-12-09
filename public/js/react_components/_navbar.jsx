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
	    if (localStorage.getItem('access_token')) {
	      return {loggedIn: true};
	    } else {
	      return {loggedIn: false};
	    };

	    // FB.getLoginStatus(function(response) {
	    // console.log(response); // Response came too slow
	    //   if (response.status === 'connected') {
	    //     return {loggedIn: true};
	    //   } else if (response.status === 'not_authorized') {
	    //     return {loggedIn: false};
	    //   } else {
	    //     return {loggedIn: false};
	    //   }
	    // });
	    // Will change in the future by comparing the current userId on the client-side with the server-side
	  },

	  FBlogin: function(e) {
	    var that = this;
	    FB.getLoginStatus(function(response) {
	      if (response.status === 'connected') {
	        console.log('Already Logged in.');
	        that.setState({loggedIn: true});
	      }
	      else {
	        FB.login(function(response) {
	          if (response.authResponse) {
	            var userFBId = response.id;
	            var access_token = FB.getAuthResponse()['accessToken'];
	            localStorage.setItem('access_token', access_token);
	   
	            // Getting User's Info
	            FB.api('/me', function(response) {
	              // console.log(response);
	              localStorage.setItem('email', response.email);
	              localStorage.setItem('userId', response.id);
	              localStorage.setItem('name', response.name);
	            });
	            // Getting User's Profile Picture
	            FB.api('/me/picture', {type: 'large', width: '300'}, function(response) {
	              localStorage.setItem('profilePic', response.data.url);
	            });

	            that.setState({loggedIn: true});

	          } else {
	            console.log('User cancelled login or did not fully authorize.');
	            that.setState({loggedIn: false});
	          }
	        }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
	      }
	    });
	  },

	  FBlogout: function(e) {
	    this.setState({loggedIn: false});
	    FB.logout(function(response) {
	      // console.log(response);
	    }), {access_token: localStorage.getItem('access_token')};
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