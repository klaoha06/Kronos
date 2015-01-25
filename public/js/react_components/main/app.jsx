define(['react', 'react-router', 'jsx!react_components/header/_navbar', 'jsx!react_components/sidebar/_sidebar', 'stores/UserStore'], function(React, Router, Navbar, Sidebar, UserStore){
	var RouteHandler = Router.RouteHandler

	var App = React.createClass({
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
				var style = {border: 0};
				return(
	        	<div id="container">
					<Navbar loggedInUser={this.state.loggedInUser} />
	         		<div id="main-container" className="row gutters">
						<Sidebar loggedInUser={this.state.loggedInUser} />
	          			<div id="main-panel" className="debug col span_10 cf">
							<RouteHandler loggedInUser={this.state.loggedInUser}/>
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