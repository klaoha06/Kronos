define(['actions/EventServerActions'], function(EventServerActions){

	var EventAPI = {
		retrieveUserEvents: function(){
			var user_id = $.cookie('user_id');
			var url = "/users/"+user_id+"/events";

			var that = this;
			//Run once to load
			$.ajax({
			url: API_URL + url,
			dataType: 'json'
			}).done(function(data){
				EventServerActions.loadAllEvents(data);
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});

		},
		createEvent: function(data) {
			 $.ajax({
			  url: API_URL + '/events',
			  dataType: 'json',
			  type: 'POST',
			  data: data
			}).success(function(data){
				console.log(data);
				// CalendarStore.updateCalById();
			}).fail(function(data){
			  console.log(data.statusText);
			});
		},
		retrieveCalEvents: function(calendar_id) {
			 $.ajax({
			  url: API_URL + '/events',
			  dataType: 'json',
			  data: calendar_id
			}).success(function(data){
				console.log(data);
			}).fail(function(data){
			  console.log(data.statusText);
			});
		}

	};

	return EventAPI;	

});