define(['../serverUrl','../actions/GroupActions'], function(apiUrl, GroupActions){
	var user_id = localStorage.getItem('userId')

	var GroupAPIs = {

		retrieveSubscribedGroups: function(){
			//Having trouble logging into facebook so hardcoding a '1' for now
			//In future, user_id should be put in there
			var url = "/users/"+1+"/subscriptions"

			var that = this
			$.ajax({
				url: apiUrl + url,
				dataType: 'json',
			}).done(function(data){
				// this.setState({data: data});
				GroupActions.loadAllGroups(data);
			}).fail(function(data){
				console.log("FAILED REQUEST")
			})

		}

	}


	return GroupAPIs
})