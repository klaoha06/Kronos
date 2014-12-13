define(['react'], function(React) {

	var UserPage = React.createClass({
		getInitialState: function() {
			return {FBEvents: []};
		},

		loadEventsFromFB: function(callback) {
			// By default this will only return events within the last two weeks, check FB api and use until or since parameters to modify this range.
			var that = this;
			FB.api(
			    "me/events?fields=cover,start_time,end_time,timezone,location,rsvp_status,description,feed_targeting,owner&limit=20",
			    function (response) {
			      if (response && !response.error) {
			      	that.setState({FBEvents: response});
			      }
			    }
			);
		},

		render: function() {
			return (
				<div>
					<div id="banner"></div>
					<h1>Hi, {localStorage.getItem('first_name') + " "+localStorage.getItem('last_name')[0] + "."}</h1>
					<img src={localStorage.getItem('profilePic')}/>
					<p>Email: {localStorage.getItem('email')}</p>
					<button onClick={this.loadEventsFromFB}>Sync With Your Facebook Events</button>
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
					<h4>{this.props.name} by {this.props.owner}</h4>
					<p>Start Time:  {this.props.startTime}</p>
					<p>End Time: {this.props.endTime}</p>
					<p>Location: {this.props.location}</p>
					<p>Timezone:  {this.props.timeZone}</p>
					<p>Your Status:  {this.props.status}</p>
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
		    		<FBEvent name={event.name} startTime={event.start_time} endTime={event.end_time} location={event.location} owner={event.owner.name} timeZone={event.timezone} status={event.rsvp_status} key={index}>
		    		</FBEvent>
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

	return UserPage

});