define(['react', 'react-router'], function(React, Router) {

	var RouteHandler = Router.RouteHandler;

	var UsersContainer = React.createClass({
		mixins: [Router.State],

		render: function() {

			//RouteHandler is basically like ng-view
			//By using it, we allow this component to have children underneath teh same route
			return(
				<div>
				<RouteHandler />
				</div>
				)
		}
	});

	return UsersContainer

});