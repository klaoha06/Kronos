//Returns: UserContainer
//Description: Renders a given users' show page. The user is determined by the id passed in the route. If the logged in user has browsed to their own page, they should have admin functionality
define(['react', 'actions/UserViewActions', 'react-router', 'jsx!react_components/user/_profile'], function(React, UserActions, Router, UserProfile) {
  var Link = Router.Link
  var UserPage = React.createClass({
    mixins: [Router.State], 
    getInitialState: function(){
      return {user: [], following: false, follower: false};
    },
    loadDataFromServer: function(user_id) {
      $.get(API_URL + '/users/' + user_id)
        .done(function(data){
          this.setState({user: data.user, following: data.friendship.following, follower: data.friendship.follower});
        }.bind(this))
        .fail(function(data){
        console.log("FAILED REQUEST");
        });
    },
    componentDidMount: function () {
      this.loadDataFromServer(this.props.user_id);
    },
    componentWillReceiveProps: function(nextProps){
      if ((nextProps.user_id !== this.props.user_id) ||  (nextProps.loggedInUser !== this.props.loggedInUser))
        this.loadDataFromServer(nextProps.user_id);
    },
    render: function() {
      return (
        <div>
        <h1>{this.state.user.name}</h1>
        <img src={this.state.user.profile_pic} />
        <br />
        <p className="italic smaller">
        { this.state.follower === true ? 
          ("Follows you") : 
          ("Doesn't follow you")
        }
        </p>
        { this.state.following === true ? 
          (<button onClick={this.handleUnfollow}>UNFOLLOW</button>) : 
          (<button onClick={this.handleFollow}>FOLLOW</button>) 
        }
        <br />
        { this.state.user.length !== 0 ? 
          (<Link to="Friendships" params={this.state.user}>{this.state.user.name}{"'s Friendships"}</Link>) : 
          ('')
        }
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

  var UserContainer = React.createClass({
    mixins: [Router.State], 
    render: function(){
      var user = this.props.loggedInUser
      return(
        <div>
        { this.props.loggedInUser === this.getParams().id ? 
          (<UserProfile loggedInUser={this.props.loggedInUser} />) : 
          (<UserPage user_id={this.getParams().id} loggedInUser={this.props.loggedInUser}/>)
        }
        </div>
      )
    }
  });
  return UserContainer
});
