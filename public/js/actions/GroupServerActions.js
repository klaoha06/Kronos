define(['dispatcher/GroupDispatcher', 'constants/GroupConstants'], function(GroupDispatcher, GroupConstants){

	var GroupServerActions = {
		loadAllGroups: function(rawGroups){
			console.log(rawGroups);
			GroupDispatcher.handleServerAction({
				actionType: GroupConstants.RECEIVE_RAW_GROUPS,
				rawGroups: rawGroups
			});
		},
		unsubscribeCompleted: function(){

		},
		unsubscribeFailed: function(){

		}
	};
	return GroupServerActions
});