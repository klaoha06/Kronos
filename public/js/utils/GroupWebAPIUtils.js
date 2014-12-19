define(['serverSetup','actions/GroupServerActions'], function(apiUrl, GroupServerActions){
	console.log(GroupServerActions)
	var GroupAPIs = {

		retrieveSubscribedGroups: function(){
			var user_id = localStorage.getItem('userId');
			console.log("USSER ID: " + user_id);
			var url = "/users/"+user_id+"/subscriptions";

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
			//Set interval to continue long polling 
			setInterval(function(){
				$.ajax({
				url: apiUrl + url,
				dataType: 'json'
				}).done(function(data){
					GroupServerActions.loadAllGroups(data);
				}).fail(function(data){
					console.log("FAILED REQUEST");
				});
			}, 5000);

		},
		unsubscribeGroup: function(id){
			var user_id = localStorage.getItem('userId');
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