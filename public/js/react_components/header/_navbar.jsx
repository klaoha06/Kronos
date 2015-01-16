define(['react', 'jquery', 'react-router', 'serverSetup', 'stores/UserStore', 'jsx!react_components/header/_auth', 'jsx!react_components/events/_createEvent'], function(React, $, Router, api, UserStore, Auth, CreateEvent){
	var Link = Router.Link;
		var Navbar = React.createClass({
		getInitialState: function(){
			return{user_id: []};
		},
		componentDidMount: function(){
			UserStore.addChangeListener(this._onChange);
		},
		_onChange: function(){
			this.setState({user_id: $.cookie('user_id')});
		},
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