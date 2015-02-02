define([
  'actions/EventServerActions',
  'stores/UserStore'],
  function(
    EventServerActions,
    UserStore
  ) {
  function tester(data) {
    console.log(data);
  }
  var EventAPI = {
    retrieveUserEvents: function() {
      //Run once to load
      $.get(API_URL + "/users/" + UserStore.currentUser() + "/events")
        .done(EventServerActions.loadAllEvents)
        .fail(function(data) { console.log("FAILED REQUEST"); });
    },
    createEvent: function(data) {
      $.post(API_URL + '/events', data)
        .done(function(data) { console.log(data); })
        .fail(function(data) { console.log(data); });
    },
    retrieveCalEvents: function(calendarId) {
      $.get(API_URL + '/events', calendarId)
        .done(function(data){ console.log(data); })
        .fail(function(data){ console.log(data.statusText); });
    },
    retrieveEventDetails: function(eventId) {
      $.get(API_URL + '/events/' + eventId)
        .done(EventServerActions.loadEventDetails)
        .fail(function(data) { console.log("FAILED REQUEST"); });
    }
  };
  return EventAPI;
});
