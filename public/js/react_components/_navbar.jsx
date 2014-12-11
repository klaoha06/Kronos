define(['react', 'jquery', 'react-router', '../serverUrl', 'auth'], function(React, $, Router, api, Auth){
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
	    if (localStorage.getItem('loggedInTime')) {
	      return {loggedIn: true};
	    } else {
	      return {loggedIn: false};
	    };
	  },

	  componentDidMount: function() {
	  	if (localStorage.getItem('loggedInTime')) {
	  	  this.setState({loggedIn: true});
	  	} else {
	  	  this.setState({loggedIn: false});
	  	};
	  },

	  logIn: function() {
	  	Auth.FBlogin();
	  	this.setState({loggedIn: true});
	  },

	  logOut: function() {
	  	Auth.FBlogout();
	  	this.setState({loggedIn: false});
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