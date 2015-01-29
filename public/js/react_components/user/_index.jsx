define(['react', 'react-router', 'jquery', 'actions/UserViewActions'], function(React, Router, $, UserAction){
	var Link = Router.Link;

	var UserNode = React.createClass({
		mixins: [ Router.Navigation ],
		addFriend: function(){	
			UserAction.follow(this.props.user.id);
			this.transitionTo("UserPage", {id: this.props.user.id});
		},
		render: function(){
			return(
				<li className="debug ta-l">
				<img className="profilePic" src={this.props.user.profile_pic}></img>
				<Link to="UserPage" params={{id: this.props.user.id}}>
				<h3 className="creator-name ta-l no-margin">{this.props.user.name} </h3>
				<h4 className="creator-username ta-l no-margin">@{this.props.user.username} </h4>
				</Link>
				<button className="follow" onClick={this.addFriend}>Follow</button>
				</li>
			)
		}

	});

	var UserIndex = React.createClass({
		getInitialState: function(){
			return {users: []}
		},
		loadDataFromServer: function(){
			$.ajax({
				url: API_URL + '/users'
			}).done(function(data){
				this.setState({users: data});
			}.bind(this))
		},
		componentDidMount: function(){
			this.loadDataFromServer();
		},
		render: function(){
			return(
				<div className="row span_6 mlr-a">
					<ul className="col span_12 ta-c">
					<h1> List of all users </h1>

					{this.state.users.map(function(user){
						return(<UserNode user={user} />)
						})
					}
					</ul>
				</div>
				)
		}
	});
	return UserIndex 
})