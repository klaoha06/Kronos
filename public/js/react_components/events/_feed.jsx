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

	var EventNode = React.createClass({
		getInitialState: function(){
			return {hover: false}
		},
		displayEventInfo: function(){
			this.setState({hover: true})
		},
		removeEventInfo: function(){
			this.setState({hover: false})
		},
		render: function(){
			var	hoverInfo, eventClass;
			if(this.state.hover === true){				
				hoverInfo = (
						<div className="hover-info">
						<Link to="UserPage" params={{id: this.props.eventObj.creator_id}}>
						<h3 className="creator-name ta-l no-margin">{this.props.eventObj.creator_name} </h3>
						<h4 className="creator-username ta-l no-margin">@{this.props.eventObj.creator_username} </h4>
						</Link>
						<p className="event-time ta-l no-margin">Starts: {moment(this.props.eventObj.startTime).twitterLong()}</p> 
						<br />
						<p className="event-time ta-l no-margin">Ends: {moment(this.props.eventObj.endTime).twitterLong()}</p>
						<p className="ta-l">Description: {this.props.eventObj.description}</p>
						</div>
				)
				imageClass = 'debug d-b m-a event-image blur';
			}
			else
			{
				imageClass = 'debug d-b m-a event-image';
			}
			console.log(this.props.eventObj)
			return (
			<div className='event-node debug cf span_12' key={this.props.index} id={"event-"+this.props.eventObj.id} onMouseEnter={this.displayEventInfo} onMouseLeave={this.removeEventInfo}>
				<div>
				<Link to="Event" params={this.props.eventObj}>
					<h2 className="event-name no-margin">
					{this.props.eventObj.name}
					</h2>
				</Link>	
				<img className={imageClass} src={this.props.eventObj.picture}  ></img>
				{hoverInfo}

				</div>
				<button className="fl-r" >Add to calendar</button>
			</div>
			)
		}
	});

	var Feed = React.createClass({
		getInitialState: function(){
			return {futureEvents: [], pastEvents: [], hover: false};
		},
		componentDidMount: function(){
			EventAPI.retrieveUserEvents();
			EventStore.addChangeListener(this._onChange);
		},

		displayEventInfo: function(e){
			console.log("display event info");
			console.log(e.target);

		},

		render: function(){
			var futureNodes = this.state.futureEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<EventNode eventObj={eventObj} index={index} />
					</div>
					</div>
				);
			});
			var pastNodes = this.state.pastEvents.map(function(eventObj, index){
				return(
					<div className="row span_10 mlr-a">
					<div className="col span_12 ta-c mlr-a">
					<EventNode eventObj={eventObj} index={index} />
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