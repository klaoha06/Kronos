define([
  'react',
  'jquery',
  'react-router',
  'utils/EventWebAPIUtils',
  'stores/EventStore',
  'moment',
  'moment-twitter'],
  function(
    React,
    $,
    Router,
    EventAPI,
    EventStore,
    moment,
    twitter
  ) {
  var Link = Router.Link;

  function getStateFromStores() {
    return {
      futureEvents: EventStore.getAllFutureEvents(),
      pastEvents: EventStore.getAllPastEvents()
    };
  }

  var TimeNow = React.createClass({
    getInitialState: function() {
      return { timeNow: moment().format('hh:mm:ss a') };
    },
    componentDidMount: function() {
      setInterval(this.updateTime, 1000);
    },
    render: function() {
      return (
        <h3>{this.state.timeNow}</h3>
      );
    },
    updateTime: function() {
      if (this.isMounted()) {
        this.replaceState({ timeNow: moment().format('hh:mm:ss a') });
      }
    },
    componentWillUnmount: function() {
    }
  });

  var EventNode = React.createClass({
    getInitialState: function() {
      return { hover: false };
    },
    displayEventInfo: function() {
      this.setState({ hover: true });
    },
    removeEventInfo: function() {
      this.setState({ hover: false });
    },
    handleResize: function(e) {
      this.setState({ eventWidth: this.refs.eventNode.getDOMNode().offsetWidth });
    },
    componentDidMount: function() {
      this.setState({ eventWidth: this.refs.eventNode.getDOMNode().offsetWidth });
      window.addEventListener('resize', this.handleResize);
    },
    componentWillUnmount: function() {
      window.removeEventListener('resize', this.handleResize);
    },
    render: function() {
      var	hoverInfo, eventClass;
      var imageClass = 'debug d-b m-a event-image';
      if (this.state.hover === true) {	
        imageClass = 'debug d-b m-a event-image blur';			
        hoverInfo = (
          <div>
            <div className="hover-background" style={{width: this.state.eventWidth}}></div>
            <div className="hover-info" style={{width: this.state.eventWidth}}>
              <Link to="UserPage" params={{id: this.props.eventObj.creator_id}}>
                <h3 className="creator-name text-left no-margin">{this.props.eventObj.creator_name}</h3>
                <h4 className="creator-username text-left no-margin">@{this.props.eventObj.creator_username}</h4>
              </Link>
              <p className="event-time text-left no-margin">Starts: {moment(this.props.eventObj.startTime).twitterLong()}</p> 
              <br />
              <p className="event-time text-left no-margin">Ends: {moment(this.props.eventObj.endTime).twitterLong()}</p>
              <p className="text-left">Description: {this.props.eventObj.description}</p>
            </div>
          </div>
        );
      }
      return (
        <div className="row col-md-10">
          <div className="col-md-12 text-center">
            <div ref="eventNode" className='event-node debug col-md-12' key={this.props.index} id={"event-"+this.props.eventObj.id} onMouseEnter={this.displayEventInfo} onMouseLeave={this.removeEventInfo}>
              <div>
                <Link to="Event" params={this.props.eventObj}>
                  <h2 className="event-name no-margin">{this.props.eventObj.name}</h2>
                </Link>	
                {this.props.eventObj.userAddedEvent ? 
                  <button className="btn btn-danger" onClick={this.removeEvent}> Remove from calendar </button> :
                  <button className="btn btn-success" onClick={this.addEvent}> Add to Calendar </button> 
                }
                <img className={imageClass} src={this.props.eventObj.picture}></img>
                {hoverInfo}
              </div>
              <button className="pull-right">Add to calendar</button>
            </div>
          </div>
        </div>
      );
    },
    addEvent: function(){

    },
    removeEvent: function(){

    }

  });

  var Feed = React.createClass({
    getInitialState: function() {
      return { futureEvents: [], pastEvents: [], hover: false };
    },
    componentDidMount: function() {
      EventAPI.retrieveUserEvents();
      EventStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      EventStore.removeChangeListener(this._onChange);
    },
    componentWillReceiveProps: function(nextProps){
      if(nextProps.loggedInUser !== this.props.loggedInUser)
         EventAPI.retrieveUserEvents();
    },
    render: function() {
      return (
        <div className="col-md-12 text-center clearfix">
          <div className="col-md-9">
            <div id="futurecontainer" className="debug">
              <h1>Upcoming Events</h1>
              {
                this.state.futureEvents.map(function(eventObj, index) {
                  return (<EventNode eventObj={eventObj} key={eventObj.id} />);
                })
              }
            </div>
            <hr/>
            <TimeNow />
            <hr/>
            <div id="pastcontainer" className="debug">
              <h1>Past Events</h1>
              {
                this.state.pastEvents.map(function(eventObj, index) {
                  return (<EventNode eventObj={eventObj} key={eventObj.id} /> );
                })
              }
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
