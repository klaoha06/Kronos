define(['react', 'jquery', 'react-router', 'jsx!react_components/header/_auth', 'jsx!react_components/events/_createEvent'], function(React, $, Router, Auth, CreateEvent){
	var Link = Router.Link;

	var Navbar = React.createClass({
		render: function() {
			var postLoginNav;
			if(this.props.loggedInUser)
			{
				postLoginNav = (
					<div className="fl-r">
					<Link to="UserCalendar" params={{id: this.props.loggedInUser}}><i className="fa fa-2x fa-calendar"></i></Link>
					<Link to="Friendships" params={{id: this.props.loggedInUser}} title="Manage followers"><i className="fa fa-2x fa-users"></i></Link>
					</div>
					);
			}
			return (
			    <div id="navbar">
			    	<div className="fl-l">
					<Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
					{postLoginNav}
					</div>
			        <div id="console">
			        	<CreateEvent />
			        	<Auth loggedInUser={this.props.loggedInUser} />
			        </div>
			    </div>
			)
		}
	});

	return Navbar;

});