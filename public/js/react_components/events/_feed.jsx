define(['react', 'jquery', 'react-router','serverSetup', 'utils/EventWebAPIUtils', 'stores/EventStore', 'moment'], function(React, $, Router, api, EventAPI, EventStore, moment){
	var Link = Router.Link;

	function getStateFromStores(){
		return{
			futureEvents: EventStore.getAllFutureEvents(),
			pastEvents: EventStore.getAllPastEvents()
		};
	}

	var Feed = React.createClass({
		getInitialState: function(){
			return {futureEvents: [], pastEvents: []}
		},
		componentDidMount: function(){
			EventAPI.retrieveEvents();
			EventStore.addChangeListener(this._onChange);
		},

		render: function(){
			var futureNodes = this.state.futureEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<Link to="Event" params={eventObj}>
					<div className="eventNode debug cf span_12" key={index} id={"event-"+eventObj.id}>
						<img src={eventObj.picture} className="eventImage"></img>
						<div className="event-metadata span_3">
						<span className="creator-name">{eventObj.creator_name} </span><br />
						<span className="creator-username">@{eventObj.creator_username} </span><br />
						<span className="event-time">{moment(eventObj.startTime).calendar()}</span>
						</div>
						<div className="event-name span_9">
						{eventObj.name}
						</div>
					</div>
					</Link>
					</div>
					</div>
				);
			});
			var pastNodes = this.state.pastEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<Link to="Event" params={eventObj}>
					<div className="eventNode debug cf" key={index} id={"event-"+eventObj.id}>
						<img src={eventObj.picture} className="eventImage"></img>
						<div className="event-metadata span_3">
						<span className="creator-name">{eventObj.creator_name} </span><br />
						<span className="creator-username">@{eventObj.creator_username} </span><br />
						<span className="event-time">{moment(eventObj.startTime).calendar()}</span>
						</div>
						<div className="event-name span_9">
						{eventObj.name}
						</div>
					</div>
					</Link>
					</div>
					</div>
				);
			});
			console.log(moment())
			return(
				<div className="ta-c">
				<div id="futurecontainer" className="debug feedcontainer container row">
				{futureNodes}
				</div>
				{moment().calendar()}
				<div id="pastcontainer" className="debug feedcontainer container row">
				{pastNodes}
				</div>
				</div>
				);
		},
		_onChange: function() {
		   this.setState(getStateFromStores());
		 }
	});

	return Feed;

});