define(['react', 'jquery', 'react-router', '../serverUrl', 'jsx!react_components/_user'], function(React, $, Router, api, Auth){
	var Link = Router.Link
	var Navbar = React.createClass({
	  render: function() {
	    return (
	      <div id="navbar">
	        <input id="search" type="text" />
	        <Link to="Main">Home</Link>
	        <div id="console">
	        </div>
	      </div>
	    );

	  }
	});

	return Navbar;

});