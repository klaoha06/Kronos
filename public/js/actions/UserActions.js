define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'utils/UserUtils'], function(Dispatcher, KronosConstants, UserUtils){
	var UserActions = {
		recieveUserId: function(userId) {
			Dispatcher.handleServerAction({
			  actionType: KronosConstants.RECEIVE_USER_ID,
			  userId: userId
			});
		},
		deleteUserId: function(){
			Dispatcher.handleServerAction({
			  actionType: KronosConstants.CLEAR_USER_ID
			});
		}
	};
	return UserActions;
});
