define(['react', 'react-router', 'jsx!react_components/header/_navbar', 'jsx!react_components/sidebar/_sidebar', 'stores/UserStore'], function(React, Router, Navbar, Sidebar, UserStore){
	var RouteHandler = Router.RouteHandler

	var App = React.createClass({
			mixins: [ Router.State ],
			getInitialState: function(){
				return {loggedInUser: UserStore.currentUser()}
			},
			componentDidMount: function(){
				UserStore.addChangeListener(this._onChange);
			},
			componentWillUnmount: function() {
				User.removeChangeListener(this._onChange);
			},
			render: function () {
				var display;
				//How do we want to handle someone who is not logged in? 
				//We could maybe always just show the feed? For now just setting up
				//The beginnings of a login page
				if(this.state.loggedInUser)
					display = (<RouteHandler loggedInUser={this.state.loggedInUser} key={this.getRoutes().reverse()[0].name}/>)
				else
					display = (<h1> Please login. </h1>)

				//Play around with animations
				var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;
				return(
	        	<div id="container">
					<Navbar loggedInUser={this.state.loggedInUser} />
	         		<div id="main-container" className="row gutters">
						<Sidebar loggedInUser={this.state.loggedInUser} />
	          			<div id="main-panel" className="debug col span_10 cf">
	          				<ReactCSSTransitionGroup transitionName="page-transition">
							{display}
							</ReactCSSTransitionGroup>
						</div>
	        		</div>
				</div>
				)
			},
			_onChange: function(){
				this.setState({loggedInUser: UserStore.currentUser()})
			}
		})

	return App
});