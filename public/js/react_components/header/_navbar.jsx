define(['react', 'jquery', 'react-router', 'serverSetup', 'jsx!react_components/header/_auth'], function(React, $, Router, api, Auth){
	var Link = Router.Link;
		var Navbar = React.createClass({
		render: function() {
			var user = {id: localStorage.getItem('userId')};
			if(user.id !== null){
			    return (
			        <div id="navbar">
			        {/*<input id="search" type="text" />*/}
				        <Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
						<Link to="UserCalendar" params={user}><i className="fa fa-2x fa-calendar"></i></Link>
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