define(['react', 'jquery', 'react-router', 'bluebird', '../serverUrl', 'auth'], function(React, $, Router, Promise, api, Auth){
	var Link = Router.Link
	var Navbar = React.createClass({
	  render: function() {

	    return (
	      <div id="navbar">
	        <input id="search" type="text" />
	        <Link to="Main">Home</Link>
	        <div id="console">
	          <LogInButton />
	        </div>
	      </div>
	    );

	  }
	});

	var LogInButton = React.createClass({

	  getInitialState: function() {
	    if (localStorage.getItem('userId')) {
	      return {loggedIn: true};
	    } else {
	      return {loggedIn: false};
	    };
	  },

	  logIn: function() {
	  	var that = this;
	  	Auth.FBlogin(function(result){
		  	that.setState({loggedIn: result});
	  	});
	  },

	  logOut: function() {
	  	var that = this;
	  	Auth.FBlogout(function(result){
		  	that.setState({loggedIn: result});
	  	});
	  },

	  render: function() {
	    if (this.state.loggedIn) {
	      return (
	        <div>
	          <button onClick={this.logOut}>Log Out</button>
	        </div>
	      );
	    } else {
	      return (
	        <button onClick={this.logIn}>Log In</button>
	      );
	    };
	  }
	});

	var UserPage = React.createClass({
	  render: function() {
	    return (
	      <img id="profilePic" src={localStorage.getItem('profilePic')} />
	    );
	  }
	});

	return Navbar;

});