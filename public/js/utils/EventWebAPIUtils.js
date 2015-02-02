define([
  'actions/EventServerActions',
  'stores/UserStore'],
  function(
    EventServerActions,
    UserStore
  ) {
  var EventAPI = {
    retrieveUserEvents: function() {
      //Run once to load
      $.get(API_URL + "/users/" + UserStore.currentUser() + "/events")
        .done(EventServerActions.loadAllEvents.bind(this))
        .fail(function(data) { console.log("FAILED REQUEST"); }.bind(this));
    },
    createEvent: function(data) {
      $.post(API_URL + '/events', data)
        .done(function(data) { console.log(data); })
        .fail(function(data) { console.log(data); });
    },
    retrieveCalEvents: function(calendar_id) {
      $.get(API_URL + '/events', calendar_id)
        .done(function(data){ console.log(data); })
        .fail(function(data){ console.log(data.statusText); });
    }
  };
  return EventAPI;
});
