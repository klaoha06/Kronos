define(['dispatcher/KronosDispatcher', 'constants/UserConstants', 'utils/UserUtils'], function(Dispatcher, UserConstants, UserUtils){
	var UserActions = {
		recieveUserId: function(userId) {
			Dispatcher.handleServerAction({
			  actionType: UserConstants.RECEIVE_USER_ID,
			  userId: userId
			});
		},
		deleteUserId: function(){
			Dispatcher.handleServerAction({
			  actionType: UserConstants.CLEAR_USER_ID
			});
		}
	};
	return UserActions;
});
