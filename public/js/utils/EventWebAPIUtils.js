define(['serverSetup','actions/EventServerActions'], function(apiUrl, EventServerActions){

	var EventAPI = {
		retrieveEvents: function(){
			var user_id = localStorage.getItem('userId');
			var url = "/users/"+user_id+"/events";

			var that = this;
			//Run once to load
			$.ajax({
			url: apiUrl + url,
			dataType: 'json'
			}).done(function(data){
				EventServerActions.loadAllEvents(data);
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});

		},
		createEvent: function(data) {
			 $.ajax({
			  url: apiUrl + '/events',
			  dataType: 'json',
			  type: 'POST',
			  data: data
			}).success(function(data){
				console.log(data);
			}).fail(function(data){
			   console.log(data.statusText);
			});
		}

	};

	return EventAPI;	

});