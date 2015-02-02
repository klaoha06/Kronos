define([
  'dispatcher/KronosDispatcher',
  'constants/KronosConstants'],
  function(
    Dispatcher,
    Constants
  ) {
  var EventServerActions = {
    loadAllEvents: function(rawEvents) {
      Dispatcher.handleServerAction({
        actionType: Constants.RECEIVE_RAW_EVENTS,
        futureEvents: rawEvents.futureEvents,
        pastEvents: rawEvents.pastEvents
      });
    },
    loadEventDetails: function(eventDetails) {
      Dispatcher.handleServerAction({
        actionType: Constants.RECEIVE_EVENT_DETAILS,
        eventDetails: eventDetails
      });
    },
    unsubscribeCompleted: function() {
    },
    unsubscribeFailed: function() {
    }
  };
  return EventServerActions;
});
