define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'utils/GroupWebAPIUtils'], function(Dispatcher, Constants, GroupAPI){

	var GroupViewActions = {
		unsubscribeGroup: function(groupId){
			Dispatcher.handleViewAction({
				actionType: Constants.GROUP_UNSUBSCRIBE,
				id: groupId
			});

			GroupAPI.unsubscribeGroup(groupId)
		}
	};

	return GroupViewActions;

});