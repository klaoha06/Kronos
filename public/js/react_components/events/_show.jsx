define([
  'react',
  'jquery',
  'react-router',
  'actions/EventViewActions',
  'moment'],
  function(
    React,
    $,
    Router,
    EventViewActions,
    moment
  ) {
  var Event = React.createClass({
    mixins: [Router.State], //Gives us ability to check URL with this.getParams
    render: function() {
      return (
        <h1>Event Show Page for Event # {this.getParams().id} </h1>
      );
    }
  });
  return Event;
});

