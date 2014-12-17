define(['../serverSetup','../actions/GroupActions'], function(apiUrl, GroupActions){

	var GroupAPIs = {

		retrieveSubscribedGroups: function(){
			var user_id = localStorage.getItem('userId')
			console.log("USSER ID: " + user_id)
			var url = "/users/"+user_id+"/subscriptions"

			var that = this
			//Run once to load
			$.ajax({
			url: apiUrl + url,
			dataType: 'json',
			}).done(function(data){
				// this.setState({data: data});
				GroupActions.loadAllGroups(data);
			}).fail(function(data){
				console.log("FAILED REQUEST")
			})
			//Set interval to continue long polling 
			setInterval(function(){
				$.ajax({
				url: apiUrl + url,
				dataType: 'json',
				}).done(function(data){
					// this.setState({data: data});
					GroupActions.loadAllGroups(data);
				}).fail(function(data){
					console.log("FAILED REQUEST")
				})
			}, 5000);

		}

	}


	return GroupAPIs
})