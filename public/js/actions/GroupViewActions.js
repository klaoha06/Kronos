define(['dispatcher/AppDispatcher', 'constants/GroupConstants', 'utils/GroupWebAPIUtils'], function(AppDispatcher, GroupConstants, GroupAPI){

	var GroupViewActions = {
		unsubscribeGroup: function(groupId){
			AppDispatcher.handleViewAction({
				actionType: GroupConstants.GROUP_UNSUBSCRIBE,
				id: groupId
			});

			GroupAPI.unsubscribeGroup(groupId)
		}
	};

	return GroupViewActions;

});