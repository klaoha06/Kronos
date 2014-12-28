define(['serverSetup','actions/CalendarActions'], function(apiUrl, CalendarActions){

	var CalendarAPI = {
		getUserCals: function(){
			var url = "/users/"+localStorage.getItem('userId')+"/calendars";
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

		}

	};

	return CalendarAPI;	

});