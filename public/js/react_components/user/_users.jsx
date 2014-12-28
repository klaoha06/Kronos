define(['react', 'serverSetup', 'jsx!react_components/user/_profile', 'jsx!react_components/user/_user'], function(React, api, UserProfile, User) {

	var UserPage = React.createClass({
		getInitialState: function() {
			var url = window.location.href;
			var userId = url.substring(url.lastIndexOf('/') + 1);
			return {userId: userId }
		},

		render: function() {
			if (localStorage.getItem('userId') == this.state.userId) {
				return (
					<UserProfile />
				)
			} else {
				return (
					<User userId={this.state.userId}/>
				)
			}
		}
	});

	return UserPage

});