define(['react', 'jsx!react_components/main', 'react-router', 'jsx!react_components/group/_show', 'jsx!react_components/nav/_navbar', 'jsx!react_components/_sidebar', 'jsx!react_components/calendar/_show', 'jsx!react_components/user/_user'], function(React, Main, Router, Group, Navbar, Sidebar, Calendar, User){
	//I can't figure out how to get RequireJS to include these at a global level
	//so just declaring them locally here 

	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;
	var Route = Router.Route;
	var Routes = Router.Routes;
	
	var App = React.createClass({
		render: function () {
			return(
          <div id="container">
						<Navbar />
            <div id="main-container" className="row gutters">
							<Sidebar />
            	<div id="main-panel" className="debug col span_10 cf">
							<RouteHandler />
						</div>
          </div>
				</div>
			)
		}
	})

	var routes = (
		<Route handler={App}>
			<Route name="Groups" path="group/:id" handler={Group} />
			<Route name="Calendar" path="calendar/:id" handler={Calendar} />
			<Route name="Main" path="/" handler={Main} />
			<Route name="UserPage" path="users/:id" handler={User} />
		</Route>
	);

	Router.run(routes, function (Handler) {
		React.render(<Handler/>, document.body);
	});

})