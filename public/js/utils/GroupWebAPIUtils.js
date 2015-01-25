define(['actions/GroupServerActions', 'stores/UserStore'], function(GroupServerActions, UserStore){
	var GroupAPIs = {

		retrieveSubscribedGroups: function(){
			var url = "/users/"+UserStore.currentUser()+"/groups";
			var that = this;
			//Run once to load
			$.ajax({
			url: API_URL + url,
			dataType: 'json'
			}).done(function(data){
				GroupServerActions.loadAllGroups(data);
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});


		},
		unsubscribeGroup: function(id){
			var url = "/users/" + UserStore.currentUser() + "/unsubscribe_group"

			$.ajax({
				url: API_URL + url, 
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