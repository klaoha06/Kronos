define([
  'dispatcher/KronosDispatcher',
  'constants/KronosConstants',
  'utils/EventWebAPIUtils'],
  function(
    Dispatcher,
    Constants,
    EventAPI
  ) {
  var EventViewActions = {
    addEvent: function(eventId) {
      Dispatcher.handleViewAction({
        actionType: Constants.ADD_EVENT,
        eventId: eventId
      });
      EventAPI.addEvent(eventId);
    }
  };
  return EventViewActions;
});
