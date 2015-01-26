define(['react', 'jquery', 'react-router', 'jsx!react_components/header/_auth', 'jsx!react_components/events/_createEvent'], function(React, $, Router, Auth, CreateEvent){
	var Link = Router.Link;

	var Navbar = React.createClass({
		render: function() {
			return (
			    <div id="navbar">
			    	<div className="fl-l">
					<Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
					{this.props.loggedInUser ? 
						(<div className="fl-r">
							<Link to="UserCalendar" params={{id: this.props.loggedInUser}}><i className="fa fa-2x fa-calendar"></i></Link>
							<Link to="Friendships" params={{id: this.props.loggedInUser}} title="Manage followers"><i className="fa fa-2x fa-users"></i></Link>
						</div>) : ('')
					}
					</div>
			        <div id="console">
			        	{this.props.loggedInUser ? <CreateEvent /> : '' }
			        	<Auth loggedInUser={this.props.loggedInUser} />
			        </div>
			    </div>
			)
		}
	});

	return Navbar;

});