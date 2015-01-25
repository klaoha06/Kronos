define(['react', 'react-router', 'jsx!react_components/header/_navbar', 'jsx!react_components/sidebar/_sidebar'], function(React, Router, Navbar, Sidebar){
	var RouteHandler = Router.RouteHandler

	var App = React.createClass({
			render: function () {
				var style = {border: 0};
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

	return App
});