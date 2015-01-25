define(['react', 'utils/UserUtils', 'react-router', 'actions/UserViewActions'], function(React, UserAPI, Router, UserAction) {
	var Link = Router.Link;


	var FriendNode = React.createClass({

		removeFriend: function(e){
			UserAction.unfollow(this.props.friend.id)
			this.props.onUnfollow(this.props.index)
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

		getInitialState: function(){
			return{followers: [], following: []}
		},
		loadDataFromServer: function(user_id){
			var that = this;
			$.ajax({
			  url: API_URL + '/users/' + user_id + '/friendships'
			}).done(function(friends) {
				var temp_followers = [];
				var temp_following = [];
				friends.followers.forEach(function(follower){
				  	temp_followers.push(follower)
			    });

			    friends.following.forEach(function(user_following){
				  	temp_following.push(user_following)
			  	});
				that.setState({user: friends.user, followers: temp_followers, following: temp_following});
			}).fail(function(data){
			  console.log('Failed to get friendships.');
			})
		},

		componentDidMount: function(){
			this.loadDataFromServer(this.props.user_id);
		},
		componentWillReceiveProps: function(nextProp){
			if(nextProp.user_id !== this.props.user_id)
				this.loadDataFromServer(nextProp.user_id)
		},
		render: function() {			
			var display_unfollow;
			var user_name;

			if(this.state.user !== undefined)
			{
				user_name = this.state.user.name
			}
			if ($.cookie('user_id') === this.props.user_id) {
				display_unfollow = false
			}
			else
				display_unfollow = true

			var followers = this.state.followers.map(function(follower, index){
				return (
					<FriendNode friend={follower} follow={true} key={index} />
					)
			})
			var that = this;
			var following = this.state.following.map(function(user, index){
				return (
					<FriendNode friend={user} key={index} index={index} follow={display_unfollow} onUnfollow={that.handleUnfollow} />
					)
			})
				return (
					<div>
					<h2>{user_name}{"'s friendships"}</h2>
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
					</div>
				)
		},
		handleUnfollow: function(index){
			console.log('making it to handleUnfollow?')
			console.log(this.state.following)
			var temp_following = this.state.following;
			temp_following.splice(index, 1);
			console.log(temp_following)
			this.setState({following: temp_following})
		}

	})

	var FriendshipContainer = React.createClass({
		mixins: [ Router.State ],
		render: function(){
			return (
				<Friendships user_id={this.getParams().id} />
				)
		}
	})


	return FriendshipContainer

});