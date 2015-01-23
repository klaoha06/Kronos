define(['react', 'serverSetup', 'jsx!react_components/user/_profile', 'jsx!react_components/user/_user', 'react-router'], function(React, api, UserProfile, User, Router) {

	var UserPage = React.createClass({
		mixins: [Router.State], 

		//FVJ 1/22 -- Commenting out the below because React router will return the current ID
		// if we use Router.State via this.getParams().id. We shouldn't have to keep track of 
		// the user's ID b/c we are already doing that in the route. 

		// getInitialState: function() {
			// var userId = url.substring(url.lastIndexOf('/') + 1);
			// return {userId: userId }
		// },

		render: function() {
			if ($.cookie('user_id') == this.getParams().id) {
				return (
					<UserProfile />
				)
			} else {
				return (
					<User />
				)
			}
		}
	});

	return UserPage

});