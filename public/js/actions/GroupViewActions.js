define(['dispatcher/GroupDispatcher', 'constants/GroupConstants', 'utils/GroupWebAPIUtils'], function(GroupDispatcher, GroupConstants, GroupAPI){

	var GroupViewActions = {
		unsubscribeGroup: function(groupId){
			GroupDispatcher.handleViewAction({
				actionType: GroupConstants.GROUP_UNSUBSCRIBE,
				id: groupId
			});

			GroupAPI.unsubscribeGroup(groupId)
		}
	};

	return GroupViewActions;

});