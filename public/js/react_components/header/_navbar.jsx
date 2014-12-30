define(['react', 'jquery', 'react-router', 'serverSetup', 'jsx!react_components/header/_auth'], function(React, $, Router, api, Auth){
	var Link = Router.Link;
		var Navbar = React.createClass({
		render: function() {
			var user = {id: $.cookie('user_id')};
			if(user.id !== 'undefined'){
			    return (
			        <div id="navbar">
			        {/*<input id="search" type="text" />*/}
				        <Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
						<div id="console">
								<CreateEvent />
			        	<Auth />
			      </div>
			        </div>
			    );
			}
			else{
				return(
			    <div id="navbar">
					<Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
			        <div id="console">
			        	<CreateEvent />
			        	<Auth />
			        </div>
			    </div>
			    )
				}
		  }
		});

		var CreateEvent = React.createClass({
		  render: function() {
		    return (
        	<Link to="CreateEvent">
	        	<button id="createEvent">Create Event</button>
        	</Link>
		    );
		  }
		});

	return Navbar;

});