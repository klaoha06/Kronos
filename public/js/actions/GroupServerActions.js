define(['dispatcher/AppDispatcher', 'constants/GroupConstants'], function(AppDispatcher, GroupConstants){

	var GroupServerActions = {
		loadAllGroups: function(rawGroups){
			console.log(rawGroups);
			AppDispatcher.handleServerAction({
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