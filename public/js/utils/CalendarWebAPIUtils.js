define([
  'actions/CalendarActions',
  'stores/UserStore'],
  function(
    CalendarActions,
    UserStore
  ) {
  function registerAndReturnCals(data) {
    CalendarActions.receiveUserCals(data);
    return data;
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
        .done(CalendarActions.updateLastCal.bind(this))
        .fail(function(xhr, status, err) {
          console.error(this.props, status, err.toString());
        }.bind(this));
    }
  };
  return CalendarAPI;	
});
