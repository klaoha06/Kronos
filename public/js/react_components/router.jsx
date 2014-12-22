define(['react', 'jsx!react_components/user/_calendar', 'react-router', 'jsx!react_components/group/_show', 'jsx!react_components/header/_navbar', 'jsx!react_components/_sidebar', 'jsx!react_components/calendar/_show', 'jsx!react_components/user/_user', 'jsx!react_components/events/_feed', 'jsx!react_components/events/_show'], function(React, UserCalendar, Router, Group, Navbar, Sidebar, Calendar, User, Feed, Event){
	//I can't figure out how to get RequireJS to include these at a global level
	//so just declaring them locally here 

	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;
	var Route = Router.Route;
	var Routes = Router.Routes;

	// Load FB SDK
	window.fbAsyncInit = function() {
	  FB.init({
	    appId      : '751003924936029',
	    xfbml      : true,
	    version    : 'v2.2',
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
	      // var fbStatus;
	      // FB.getLoginStatus(function(res) {
	      //   fbStatus = res.status;
	      // });
	      // if ($.cookie('access_token')) {
	        xhr.setRequestHeader("access_token", $.cookie('access_token'));
	      // } else {
	      //   console.log("can't send data before login or your session has timed out");
	        // localStorage.clear();
	        // document.location.href="/";
	        // alert("can't send data before login or your session has timed out");
	      // }
	    }
	});   
	
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
			<Route name="UserCalendar" path="users/:id/calendar" handler={UserCalendar} />
			<Route name="UserPage" path="users/:id" handler={User} />
			<Route name="Feed" path="/" handler={Feed} />
			<Route name="Event" path="event/:id" handler={Event} />
		</Route>
	);

	Router.run(routes, function (Handler) {
		React.render(<Handler/>, document.body);
	});

})