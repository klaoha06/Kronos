define(['react', 'jquery', 'react-router','serverSetup', 'utils/EventWebAPIUtils', 'stores/EventStore', 'moment', 'moment-twitter'], function(React, $, Router, api, EventAPI, EventStore, moment, twitter){
	var Link = Router.Link;

	function getStateFromStores(){
		return{
			futureEvents: EventStore.getAllFutureEvents(),
			pastEvents: EventStore.getAllPastEvents()
		};
	}

	var TimeNow = React.createClass({
		getInitialState: function(){
			return {timeNow: moment().format('hh:mm:ss a')};
		},
    componentDidMount: function(){
	    	setInterval(this.updateTime, 1000);
    },

    render: function(){
    	return (
    		<h3>{this.state.timeNow}</h3>
    	)
    },
    updateTime: function(){
    	if (this.isMounted()) {
	    	this.replaceState({timeNow: moment().format('hh:mm:ss a')});
	    }
    },
    componentWillUnmount: function(){
    	
    }

	});

	var Feed = React.createClass({
		getInitialState: function(){
			return {futureEvents: [], pastEvents: []};
		},
		componentDidMount: function(){
			EventAPI.retrieveUserEvents();
			EventStore.addChangeListener(this._onChange);
		},

		render: function(){
			var futureNodes = this.state.futureEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<div className="eventNode debug cf span_12" key={index} id={"event-"+eventObj.id}>
						<div>
						<Link to="Event" params={eventObj}>
							<h2 className="event-name">
							{eventObj.name}
							</h2>
						</Link>
						<Link to="UserPage" params={{id: eventObj.creator_id}}>
						<h3 className="creator-name ta-l">{eventObj.creator_name} </h3>
						<h4 className="creator-username ta-l">@{eventObj.creator_username} </h4><br />
						</Link>
						<p className="event-time ta-l">{moment(eventObj.startTime).twitterLong()}</p>
						<img className="debug d-b m-a" src={eventObj.picture}></img>
						</div>
						<button className="fl-r">Subscribe</button>

					</div>
					</div>
					</div>
				);
			});
			var pastNodes = this.state.pastEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<div className="eventNode debug cf" key={index} id={"event-"+eventObj.id}>
						<div>
						<Link to="Event" params={eventObj}>
							<h2 className="event-name">
							{eventObj.name}
							</h2>
						</Link>
						<Link to="UserPage" params={{id: eventObj.creator_id}}>
						<h3 className="creator-name ta-l">{eventObj.creator_name} </h3><br />
						<h4 className="creator-username ta-l">@{eventObj.creator_username} </h4><br />
						</Link>
						<p className="event-time ta-l">{moment(eventObj.startTime).twitterLong()}</p>
						<img src={eventObj.picture} className="debug"></img>
						</div>
						<button className="fl-r">Subscribe</button>

					</div>
					</div>
					</div>
				);
			});
			// console.log(moment())
			return(
				<div className="ta-c">
					<div className=" col span_9">
						<div id="futurecontainer" className="debug">
							<h1>Upcoming Events</h1>
							{futureNodes}
						</div>
						<hr/>
						<TimeNow />
						<hr/>
						<div id="pastcontainer" className="debug">
							<h1>Past Events</h1>
								{pastNodes}
						</div>
					</div>
					<div className=" col span_3 fl-r">
						<h1>Trending Calendars</h1>
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