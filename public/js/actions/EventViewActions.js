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
    addEvent: function(event) {
      Dispatcher.handleViewAction({
        actionType: Constants.ADD_EVENT_TO_CAL,
        event: event
      });
      EventAPI.addEvent(event.id);
    },
    removeEvent: function(eventId) {
      Dispatcher.handleViewAction({
        actionType: Constants.REMOVE_EVENT_FROM_CAL,
        eventId: eventId
      });
      EventAPI.removeEvent(eventId);
    }
  };
  return EventViewActions;
});
