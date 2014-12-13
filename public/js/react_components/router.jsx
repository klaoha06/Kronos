define(['react', 'jsx!react_components/main', 'react-router', 'jsx!react_components/group/_show', 'jsx!react_components/_navbar', 'jsx!react_components/_sidebar', 'jsx!react_components/calendar/_show', 'jsx!react_components/_user'], function(React, Main, Router, Group, Navbar, Sidebar, Calendar, User){
	//I can't figure out how to get RequireJS to include these at a global level
	//so just declaring them locally here 
	var RouteHandler = Router.RouteHandler
	var DefaultRoute = Router.DefaultRoute
	var Route = Router.Route
	var Routes = Router.Routes

	var App = React.createClass({

		render: function () {

			// Load FB SDK
			window.fbAsyncInit = function() {
			  FB.init({
			    appId      : '751003924936029',
			    xfbml      : true,
			    version    : 'v2.1',
			    status     : true
			  });
			};
			(function(d, s, id){
			 var js, fjs = d.getElementsByTagName(s)[0];
			 if (d.getElementById(id)) {return;}
			 js = d.createElement(s); js.id = id;
			 js.src = "js/vendor/fb_sdk.js";
			 fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));

			// Setup Ajax call (all ajax calls will be authenticated)
			$.ajaxSetup({
			    beforeSend: function(xhr) {

			      function getCookie(cname) {
			          var name = cname + "=";
			          var ca = document.cookie.split(';');
			          for(var i=0; i<ca.length; i++) {
			              var c = ca[i];
			              while (c.charAt(0)==' ') c = c.substring(1);
			              if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
			          }
			          return "";
			      }

			      if (Date.now() - localStorage.getItem('loggedInTime') < 10800000) {
			        xhr.setRequestHeader('access_token', getCookie('access_token'));
			      } else {
			        localStorage.clear();
			        console.log("can't send data before login");
			      }
			    }
			});

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