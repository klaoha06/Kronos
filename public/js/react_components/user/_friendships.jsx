define(['react', 'serverSetup', 'stores/FriendStore', 'utils/UserUtils', 'react-router', 'actions/UserViewActions'], function(React, api, FriendStore, UserAPI, Router, UserAction) {
	var Link = Router.Link;

	function getStateFromStores(){
		return{ followers: FriendStore.getAllFollowers(), following: FriendStore.getAllFollowing()}
	}


	var FriendNode = React.createClass({

		removeFriend: function(e){
			UserAction.Unfollowollow(this.props.friend.id)
		},

		render: function(){
			var change_friendship;
			if(this.props.follow === false)
			{
				change_friendship = (
					<button className="Unfollow" onClick={this.removeFriend}>Unfollow</button>
				)
			}

			return(
				<li className="debug">
				<img className="profilePic" src={this.props.friend.profile_pic}></img>
				<Link to="UserPage" params={{id: this.props.friend.id}}>
				<h3 className="creator-name ta-l no-margin">{this.props.friend.name} </h3>
				<h4 className="creator-username ta-l no-margin">@{this.props.friend.username} </h4>
				</Link>
				{change_friendship}
				</li>
			)
		}
	})


	var Friendships = React.createClass({
		mixins: [ Router.State ],

		getInitialState: function(){
			UserAPI.getAllFriendships(this.getParams().id);
			return{followers: [], following: []}
		},
		componentDidMount: function(){
			FriendStore.addChangeListener(this._onChange);
		},

		render: function() {

			var followers = this.state.followers.map(function(follower, index){
				return (
					<FriendNode friend={follower} key={index} follow={true} />
					)
			})

			var following = this.state.following.map(function(user, index){
				return (
					<FriendNode friend={user} key={index} follow={false} />
					)
			})

				return (
					<div className="row">
					<div className="col span_6 debug">
					<h1>Followers</h1>
						<ul className="friends_list" >
						{followers}
						</ul>
					</div>
					<div className="col span_6 debug">
						<h1>Following</h1>
						<ul className="friends_list">
						{following}
						</ul>
					</div>
					</div>
				)
		},
		_onChange: function() {
		   this.setState(getStateFromStores());
		 }

	})


	return Friendships

});