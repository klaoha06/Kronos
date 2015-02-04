//Returns: UserProfile
//Description: Renders a react component displaying the logged in user's personal profile
define(['react', 'actions/CalendarActions'], function(React, CalendarActions) {
  var UserProfile = React.createClass({
    getInitialState: function() {
      return {FBEvents: []};
    },
    loadEventsFromFB: function(callback) {
      // By default this will only return events within the last two weeks, check FB api and use until or since parameters to modify this range.
      var that = this;
      FB.api(
        "me/events?fields=name,cover,start_time,end_time,timezone,location,rsvp_status,description,feed_targeting,owner&limit=30",
        function (response) {
          if (response && !response.error) {
            that.setState({FBEvents: response.data});
            $.ajax({
              url: API_URL + '/users/' + this.props.loggedInUser +'/events/provider',
              type: 'POST',
              contentType: "application/json; charset=utf-8",
              data: JSON.stringify({ events_data: response.data, provider: "FB"})
            }).success(function(data){
              CalendarActions.addOrUpdateCal(data);
            }).fail(function(data){
              console.log(data.statusText);
            });
          } else {
            console.log(response.error.message);
            localStorage.clear();
            document.location.href="/";
            alert('You session has timed out or you are not logged in FB please log in')
          }
        }
      );
    },
    render: function() {
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      return (
        <div>
          <div id="banner"></div>
          <h1>Hi, {userInfo.first_name + " "+userInfo.last_name[0] + "."}</h1>
          <img src={userInfo.profilePic}/>
          <p>Email: {userInfo.email}</p>
          <button id="test" onClick={this.loadEventsFromFB}>Sync With Your Facebook Events</button>
          <p>Click me! (just show casing we can get events from FB)</p>
          <FBEventList data={this.state.FBEvents}/>
        </div>
      )
    }
  });
  var FBEvent = React.createClass({
    render: function (){
      return (
        <div className="event">
          <hr/>
          <h4>{this.props.data.name} by {this.props.data.owner.name}</h4>
          <img src={this.props.data.cover.source}/>
          <p>Description: {this.props.data.description}</p>
          <p>Start Time:  {this.props.data.start_time}</p>
          <p>End Time: {this.props.data.end_time}</p>
          <p>Location: {this.props.data.location}</p>
          <p>Timezone:  {this.props.data.timezone}</p>
          <p>Your Status:  {this.props.data.rsvp_status}</p>
          <hr/>
        </div>
      );
    }
  });
  var FBEventList = React.createClass({
    render: function() {
      var FBEventNodes = this.props.data.map(function(event, index) {
        return (
          <div>
          <FBEvent data={event} key={index} />
          </div>
        );
      });
      return (
        <div className="FBeventList">
          {FBEventNodes}
        </div>
      );
    }
  });
  return UserProfile
});