define(['react', 'jquery', 'react-router', 'serverSetup', 'stores/UserStore', 'jsx!react_components/header/_auth', 'jsx!react_components/events/_createEvent'], function(React, $, Router, api, UserStore, Auth, CreateEvent){
	var Link = Router.Link;
		var Navbar = React.createClass({
		getInitialState: function(){
			return{user_id: $.cookie('user_id')};
		},
		componentDidMount: function(){
			UserStore.addChangeListener(this._onChange);
		},
		_onChange: function(){
			this.setState({user_id: $.cookie('user_id')});
		},
		render: function() {
			var postLoginNav; 
			if(this.state.user_id !== undefined){
				var user = {id: this.state.user_id}
				postLoginNav = (
					<div className="fl-r">
					<Link to="UserCalendar" params={user}><i className="fa fa-2x fa-calendar"></i></Link>
					<Link to="Friendships" params={user} title="Manage followers"><i className="fa fa-2x fa-users"></i></Link>
					</div>
					);
			}
			return(
			    <div id="navbar">
			    	<div className="fl-l">
					<Link to="Feed"><i className="fa fa-2x fa-home"></i></Link>
					{postLoginNav}
					</div>
			        <div id="console">
			        	<CreateEvent />
			        	<Auth />
			        </div>
			    </div>
			    )
			}
		});

	return Navbar;

});