//Returns: UserSuggestions
//Description: Renders a list of users or calendars we recommend should be followed
define([
  'react', 
  'react-router', 
  'jquery', 
  'actions/UserViewActions'], 
  function(
    React, 
    Router, 
    $, 
    UserViewActions
  ){
  var Link = Router.Link;
  var UserNode = React.createClass({
    mixins: [ Router.Navigation ],
    getInitialState: function(){
      return {currently_following : false} 
    },
    render: function(){
      return(
        <li className="debug ta-l">
        <img className="listPic" src={this.props.user.profile_pic}></img>
        <Link to="UserPage" params={{id: this.props.user.id}}>
        <h3 className="creator-name ta-l no-margin">{this.props.user.name} </h3>
        <h4 className="creator-username ta-l no-margin">@{this.props.user.username} </h4>
        </Link>
        {this.state.currently_following ? 
          <button onClick={this.removeFriend}>Unfollow</button> :
          <button onClick={this.addFriend}>Follow</button> 
        }
        </li>
      )
    },
    addFriend: function(){  
      UserViewActions.follow(this.props.user.id);
      this.transitionTo("UserPage", {id: this.props.user.id});
    },
    removeFriend: function(){
      UserAction.unfollow(this.props.user.id)
      this.setState({currently_following : false})
    }
  });
  var UserSuggestions = React.createClass({
    getInitialState: function(){
      return {users: []}
    },
    loadDataFromServer: function(){
      $.ajax({
        url: API_URL + '/users/suggestions'
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
          <h1> Who to follow! </h1>
          {this.state.users.map(function(user){
            return(<UserNode user={user} />)
            })
          }
          </ul>
        </div>
        )
    }
  });
  return UserSuggestions
})
