define(['dispatcher/AppDispatcher', 'constants/UserConstants', 'utils/UserUtils'], function(AppDispatcher, UserConstants, UserUtils){
	var UserActions = {
		recieveUserId: function(userId) {
			AppDispatcher.handleServerAction({
			  actionType: UserConstants.RECEIVE_USER_ID,
			  userId: userId
			});
		},
		deleteUserId: function(){
			AppDispatcher.handleServerAction({
			  actionType: UserConstants.CLEAR_USER_ID
			});
		}
	};
	return UserActions;
});
