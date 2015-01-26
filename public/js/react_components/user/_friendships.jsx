define(['react', 'utils/UserUtils', 'react-router', 'actions/UserViewActions'], function(React, UserAPI, Router, UserAction) {
	var Link = Router.Link;

	var FriendNode = React.createClass({
		removeFriend: function(e){
			UserAction.unfollow(this.props.friend.id)
			this.props.onUnfollow(this.props.index)
		},
		render: function(){
			return(
				<li className="debug">
				<img className="profilePic" src={this.props.friend.profile_pic}></img>
				<Link to="UserPage" params={{id: this.props.friend.id}}>
				<h3 className="creator-name ta-l no-margin">{this.props.friend.name} </h3>
				<h4 className="creator-username ta-l no-margin">@{this.props.friend.username} </h4>
				</Link>
				{this.props.display_unfollow === true ? 
					(<button className="Unfollow" onClick={this.removeFriend}>Unfollow</button>) : 
					('')
				}
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
		componentWillReceiveProps: function(nextProps){
			if((nextProps.user_id !== this.props.user_id) || (nextProps.loggedInUser !== this.props.loggedInUser))
				this.loadDataFromServer(nextProps.user_id)
		},
		render: function() {			
			var that = this;
			console.log(this.state)
			return (
				<div>
					<h2>{this.state.user !== undefined ? this.state.user.name + "'s friendships": "Error loading page"}</h2>
					<div className="row">
						<div className="col span_6 debug">
							<h1>Followers</h1>
							<ul className="friends_list" >
								{this.state.followers.map(function(follower, index){
									return (<FriendNode friend={follower} display_unfollow={false} key={index} />)
									})
								}
							</ul>
						</div>
						<div className="col span_6 debug">
							<h1>Following</h1>
							<ul className="friends_list">
								{this.state.following.map(function(user, index){
									return (<FriendNode friend={user} key={index} index={index} onUnfollow={that.handleUnfollow} display_unfollow={that.props.loggedInUser == that.props.user_id ? true : false} />)
									})
								}
							</ul>
						</div>
					</div>
				</div>
			)
		},
		handleUnfollow: function(index){
			var temp_following = this.state.following;
			temp_following.splice(index, 1);
			this.setState({following: temp_following})
		}
	})

	var FriendshipContainer = React.createClass({
		mixins: [ Router.State ],
		render: function(){
			return (
				<Friendships user_id={this.getParams().id} loggedInUser={this.props.loggedInUser}/>
				)
		}
	})

	return FriendshipContainer

});