define([
  'react',
  'jquery',
  'react-router',
  'utils/EventWebAPIUtils',
  'stores/EventStore',
  'actions/EventViewActions',
  'moment'],
  function(
    React,
    $,
    Router,
    EventAPI,
    EventStore,
    EventViewActions,
    moment
  ) {
  function getStateFromStores() {
    return { eventDetails: EventStore.getEventDetails() };
  }

  var Event = React.createClass({
    mixins: [Router.State], //Gives us ability to check URL with this.getParams
    getInitialState: function() {
      return { eventDetails: {} };
    },
    componentDidMount: function() {
      EventAPI.retrieveEventDetails(this.getParams().id);
      EventStore.addChangeListener(this._onChange);
    },
    componentWillUnmount: function() {
      EventStore.removeChangeListener(this._onChange);
    },
    render: function() {
      return (
        <div>
          <h1>Event Show Page for Event # {this.getParams().id}</h1>
          <h2>{this.state.eventDetails.title}</h2>
          <h3>{this.state.eventDetails.startTime} - {this.state.eventDetails.endTime}</h3>
          <p><b>Description:</b> {this.state.eventDetails.description}</p>
          <p><b>Location:</b> {this.state.eventDetails.location}</p>
          <img src={this.state.eventDetails.picture}/>
        </div>
      );
    },
    _onChange: function() {
      this.setState(getStateFromStores());
    }
  });
  return Event;
});

