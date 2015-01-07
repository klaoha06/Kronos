define(['react', 'jquery', 'react-router', 'serverSetup', 'jsx!react_components/header/_auth', 'jsx!react_components/events/_createEvent'], function(React, $, Router, api, Auth, CreateEvent){
	var Link = Router.Link;
		var Navbar = React.createClass({
		render: function() {
			var user = {id: $.cookie('user_id')};
			if(typeof user.id !== 'undefined'){
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

	return Navbar;

});