define(['serverSetup','actions/CalendarActions'], function(apiUrl, CalendarActions){

	// function loadEventsFromFB() {
	//   FB.api(
	//       "me/events?fields=name,cover,start_time,end_time,timezone,location,rsvp_status,description,feed_targeting,owner&limit=30",
	//       function (response) {
	//         if (response && !response.error) {
	//           $.ajax({
	//             url: '/api/v0/users/' + $.cookie('user_id') +'/events/provider',
	//             type: 'POST',
	//             contentType: "application/json; charset=utf-8",
	//             data: JSON.stringify({ events_data: response.data, provider: "FB"})
	//           }).success(function(data){
	//             CalendarActions.addOrUpdateCal(data);
	//           }).fail(function(data){
	//             console.log(data.statusText);
	//           });
	//         } else {
	//           console.log(response.error.message);
	//           localStorage.clear();
	//           document.location.href="/";
	//           alert('You session has timed out or you are not logged in FB please log in')
	//         }
	//       }
	//   );
	// }

	var CalendarAPI = {
		initializeCals: function(){

		},
		getUserCals: function(){
			var url = "/users/"+$.cookie('user_id')+"/calendars";
			var that = this;
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