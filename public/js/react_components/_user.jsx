define(['react', 'auth'], function(React, Auth) {

	var UserPage = React.createClass({
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
				        console.log(response.data);
				        $.ajax({
				        	beforeSend: function (request)
				        	{
				        	    request.setRequestHeader("provider", "FB");
				        	},
				        	url: '/api/v0/users/' + localStorage.getItem('userId') +'/events',
				        	type: 'POST',
				        	contentType: "application/json; charset=utf-8",
				        	data: JSON.stringify(response.data)
				        }).success(function(data){
				        	// console.log(data);
				        }).fail(function(data){
				        	console.log(data.statusText);
				        });
				      } else {
							  console.log(response.error.message);
							  document.location.href="/";
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
		    		<FBEvent data={event}>
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