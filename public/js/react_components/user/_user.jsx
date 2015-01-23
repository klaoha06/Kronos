define(['react', 'serverSetup', 'actions/UserViewActions', 'react-router'], function(React, api, UserActions, Router) {

	//As of right now this page is just being loaded in with React. I think it would 
	// be better to incorporate flux but I guess we can just leave as is until it gets more complex. 

	var UserPage = React.createClass({
		mixins: [Router.State], 
		getInitialState: function(){
			return {user: [], following: false, follower: false};
		},

		loadDataFromServer: function() {
			var that = this;
			$.ajax({
				url: api + '/users/' + this.getParams().id,
				dataType: 'json'
			}).done(function(data){
				that.setState({user: data.user, following: data.friendship.following, follower: data.friendship.follower});
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});
		},

		componentDidMount: function () {
			this.loadDataFromServer();
		},
		render: function() {

			var followButton;
			var followerText;
			if(this.state.following === true) 
				followButton = <button onClick={this.handleUnfollow}>UNFOLLOW</button>
			else
				followButton = <button onClick={this.handleFollow}>FOLLOW</button>

			if(this.state.follower === true)
				followerText = <p>Follows you</p>
			else
				followerText = <p>Doesn't follow you</p>

			return (
				<div>
				<h1>{this.state.user.name}</h1>
				<img src={this.state.user.profile_pic}/>
				{followButton}
				{followerText}
				</div>
			)
		},
		handleUnfollow: function(){
			this.setState({following: false}) 

			UserActions.unfollow(this.state.user.id)
		},
		handleFollow: function(){
			this.setState({following: true}) 
			UserActions.follow(this.state.user.id)
		}
	});


	return UserPage

});

