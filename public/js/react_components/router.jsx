define(['react', 'jsx!react_components/user/_calendar', 'react-router', 
	'jsx!react_components/group/_show', 'jsx!react_components/calendar/_show', 
	'jsx!react_components/user/_users', 'jsx!react_components/events/_feed', 
	'jsx!react_components/events/_show', 'jsx!react_components/events/_createEvent',
	'jsx!react_components/user/_friendships', 'jsx!react_components/user/_user'], function(React, UserCalendar, Router, Group, Calendar, Users, Feed, Event, CreateEvent, Friendships, UserPage){
	//I can't figure out how to get RequireJS to include these at a global level
	//so just declaring them locally here 
	var RouteHandler = Router.RouteHandler;
	var DefaultRoute = Router.DefaultRoute;
	var Route = Router.Route;
	var Routes = Router.Routes;


	//Prepare app -- Load App component, and ajax setup i separate files.
	require(['app_prep/ajax_setup', 'jsx!react_components/main/app'], function( ajax_setup, App){
	 		 
	 	//FJ -- For the life of me I can't figure out how to just have this in a separate file
	 	// and require it. 	
 	 	window.fbAsyncInit = function(){
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
 		require(['app_prep/try_login']);


		var routes = (
			<Route handler={App}>
				<DefaultRoute name="Feed" handler={Feed} />
				<Route name="Groups" path="group/:id" handler={Group} />
				<Route name="Calendar" path="calendar/:id" handler={Calendar} />
				<Route name="Users" path="users" handler={Users} >
					<Route name="UserCalendar" path="calendar" handler={UserCalendar} />
					<Route name="UserPage" path=":id" handler={UserPage} />
					<Route name="Friendships" path=":id/friendships" handler={Friendships} />
				</Route>
				<Route name="Event" path="event/:id" handler={Event} />
			</Route>
		);

		Router.run(routes, function (Handler) {
			React.render(<Handler/>, document.body);
		});

	});
});