define(['react', 'jquery', 'react-router', '../serverUrl', 'jsx!auth'], function(React, $, Router, api, Auth){
	var Link = Router.Link
	var Navbar = React.createClass({
	  render: function() {
	    return (
	      <div id="navbar">
	        <input id="search" type="text" />
	        <Link to="Main">Home</Link>
	        <div id="console">
	          <Auth />
	        </div>
	      </div>
	    );

	  }
	});

	return Navbar;

});