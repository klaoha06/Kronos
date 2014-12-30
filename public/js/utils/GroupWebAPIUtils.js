define(['serverSetup','actions/GroupServerActions'], function(apiUrl, GroupServerActions){
	var GroupAPIs = {

		retrieveSubscribedGroups: function(){
			var user_id = $.cookie('user_id');
			var url = "/users/"+user_id+"/groups";

			var that = this;
			//Run once to load
			$.ajax({
			url: apiUrl + url,
			dataType: 'json'
			}).done(function(data){
				GroupServerActions.loadAllGroups(data);
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});


		},
		unsubscribeGroup: function(id){
			var user_id = $.cookie('user_id');
			var url = "/users/" + user_id + "/unsubscribe_group"

			$.ajax({
				url: apiUrl + url, 
				method: "DELETE",
				data: {group_id: id}
			}).done(function(){
				GroupServerActions.unsubscribeCompleted();
			}).fail(function(){
				GroupServerActions.unsubscribeFailed();
			})
		}

	};


	return GroupAPIs;
});