define(['API_URL','actions/CalendarActions'], function(API_URL, CalendarActions){

	var CalendarAPI = {
		initializeCals: function(){

		},
		getUserCals: function(){
			var url = "/users/"+$.cookie('user_id')+"/calendars";
			var that = this;
			$.ajax({
			url: API_URL + url,
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
			  url: API_URL + '/calendars',
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