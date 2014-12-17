define(['react', 'jquery', 'react-router', '../serverUrl', 'jsx!react_components/_auth'], function(React, $, Router, api, Auth){
	var Link = Router.Link;
	var LogIn = React.createClass({
	  render: function() {
	  	return (
	  	  <Auth />
	  	);
	  }
	});

	return LogIn;

});