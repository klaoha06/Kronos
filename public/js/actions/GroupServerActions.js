define(['dispatcher/KronosDispatcher', 'constants/KronosConstants'], function(Dispatcher, Constants){

	var GroupServerActions = {
		loadAllGroups: function(rawGroups){
			console.log(rawGroups);
			Dispatcher.handleServerAction({
				actionType: Constants.RECEIVE_RAW_GROUPS,
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