define(['../dispatcher/GroupDispatcher', '../constants/GroupConstants'], function(GroupDispatcher, GroupConstants){

	var GroupActions = {

		loadAllGroups: function(rawGroups){
			console.log(rawGroups)
			GroupDispatcher.handleServerAction({
				actionType: GroupConstants.RECEIVE_RAW_GROUPS,
				rawGroups: rawGroups
			})
		},

		unsubscribeGroup: function(group){
			GroupDispatcher.handleViewAction({
				actionType: GroupConstants.GROUP_UNSUBSCRIBE,
				id: group.id
			});
		}
	}

	return GroupActions;

})