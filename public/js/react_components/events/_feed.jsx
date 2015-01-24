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
		handleResize: function(e){
			this.setState({eventWidth: this.refs.eventNode.getDOMNode().offsetWidth});
		},
		componentDidMount: function(){
			this.setState({eventWidth: this.refs.eventNode.getDOMNode().offsetWidth});
			window.addEventListener('resize', this.handleResize)
		},
		render: function(){
			var	hoverInfo, eventClass;
			if(this.state.hover === true){				
				hoverInfo = (
						<div>
						<div className="hover-background" style={{width: this.state.eventWidth}}></div>
						<div className="hover-info" style={{width: this.state.eventWidth}}>
						<Link to="UserPage" params={{id: this.props.eventObj.creator_id}}>
						<h3 className="creator-name ta-l no-margin">{this.props.eventObj.creator_name} </h3>
						<h4 className="creator-username ta-l no-margin">@{this.props.eventObj.creator_username} </h4>
						</Link>
						<p className="event-time ta-l no-margin">Starts: {moment(this.props.eventObj.startTime).twitterLong()}</p> 
						<br />
						<p className="event-time ta-l no-margin">Ends: {moment(this.props.eventObj.endTime).twitterLong()}</p>
						<p className="ta-l">Description: {this.props.eventObj.description}</p>
						</div>
						</div>
				)
				imageClass = 'debug d-b m-a event-image blur';
			}
			else
			{
				imageClass = 'debug d-b m-a event-image';
			}
			return (
			<div ref="eventNode" className='event-node debug cf span_12' key={this.props.index} id={"event-"+this.props.eventObj.id} onMouseEnter={this.displayEventInfo} onMouseLeave={this.removeEventInfo}>
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
			return(
				<div className="col ta-c span_12 cf">
					<div className="span_9 m-a">
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
			
				</div>
				);
		},
		_onChange: function() {
		   this.setState(getStateFromStores());
		 }
	});

	return Feed;

});