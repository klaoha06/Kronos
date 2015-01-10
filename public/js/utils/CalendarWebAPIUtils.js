define(['serverSetup','actions/CalendarActions'], function(apiUrl, CalendarActions){

	var CalendarAPI = {
		getUserCals: function(){
			var url = "/users/"+$.cookie('user_id')+"/calendars";
			var that = this;
			//Run once to load
			$.ajax({
			url: apiUrl + url,
			dataType: 'json'
			}).done(function(data){
				CalendarActions.receiveUserCals(data);
				return data;
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});
		},
		createCal: function(cal) {
			$.ajax({
			  url: apiUrl + '/calendars',
			  dataType: 'json',
			  type: 'POST',
			  data: {calendar: cal},
			  success: function(data) {
			  	CalendarActions.updateLastCal(data);
			  }.bind(this),
			  error: function(xhr, status, err) {
			    console.error(this.props, status, err.toString());
			  }.bind(this)
			});
		}

	};

	return CalendarAPI;	

});