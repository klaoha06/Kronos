define(['react', 'serverSetup', 'jsx!react_components/user/_profile', 'jsx!react_components/user/_user'], function(React, api, UserProfile, User) {
	var url = window.location.href;
	var userId = url.substring(url.lastIndexOf('/') + 1);

	var UserPage = React.createClass({

		render: function() {

			if (localStorage.getItem('userId') == userId) {
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