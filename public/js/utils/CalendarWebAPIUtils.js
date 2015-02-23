define([
  'actions/CalendarActions',
  'stores/UserStore'],
  function(
    CalendarActions,
    UserStore
  ) {
  function registerAndReturnCals(data) {
    console.log(data);
    CalendarActions.receiveUserCals(data);
  }

  var CalendarAPI = {
    initializeCals: function() {
    },
    getUserCals: function() {
      var url = "/users/" + UserStore.currentUser() + "/calendars";
      $.get(API_URL + url)
        .done(registerAndReturnCals)
        .fail(function(data) { console.log("FAILED REQUEST"); });
    },
    createCal: function(cal) {
      $.post(API_URL + '/calendars', { calendar: cal })
        .done(CalendarActions.updateLastCal)
        .fail(function(xhr, status, err) {
          console.error(this.props, status, err.toString());
        });
    }
  };
  return CalendarAPI;	
});
