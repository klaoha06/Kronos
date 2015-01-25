define(['react', 'actions/UserViewActions', 'react-router', 'jsx!react_components/user/_profile'], function(React, UserActions, Router, UserProfile) {
	var Link = Router.Link
	//As of right now this page is just being loaded in with React. I think it would 
	// be better to incorporate flux but I guess we can just leave as is until it gets more complex. 

	var UserPage = React.createClass({
		mixins: [Router.State], 
		getInitialState: function(){
			return {user: [], following: false, follower: false};
		},

		loadDataFromServer: function(user_id) {
			var that = this;
			$.ajax({
				url: API_URL + '/users/' + user_id,
				dataType: 'json'
			}).done(function(data){
				that.setState({user: data.user, following: data.friendship.following, follower: data.friendship.follower});
			}.bind(this)).fail(function(data){
				console.log("FAILED REQUEST");
			})
		},
		componentDidMount: function () {
			this.loadDataFromServer(this.props.user_id);
		},
		componentWillReceiveProps: function(nextProps){
			if(nextProps.user_id !== this.props.user_id)
				this.loadDataFromServer(nextProps.user_id);
		},
		render: function() {
			var followButton;
			var followerText;
			var friendships;
			if(this.state.following === true) 
				followButton = <button onClick={this.handleUnfollow}>UNFOLLOW</button>
			else
				followButton = <button onClick={this.handleFollow}>FOLLOW</button>

			followerText = this.state.follower === true ? "Follows you" : "Doesn't follow you"
			if(this.state.user.length !== 0)
			{
				friendships = <Link to="Friendships" params={this.state.user}>{this.state.user.name}{"'s Friendships"}</Link>

			}
			return (
				<div>
				<h1>{this.state.user.name}</h1>
				<img src={this.state.user.profile_pic} />
				<br />
				<p className="italic smaller">{followerText}</p>
				{followButton}
				<br />
				{friendships}
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

	var Users = React.createClass({
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
					<UserPage user_id={this.getParams().id}/>
				)
			}
		}
	});

	return Users

});

