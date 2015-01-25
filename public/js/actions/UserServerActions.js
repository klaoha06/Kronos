define(['dispatcher/KronosDispatcher', 'constants/KronosConstants'], function(Dispatcher, KronosConstants){
	//We need a separate file to handle view actions because otherwise there will be circular require
	// statements. I.e. UserAction will need to call the UserAPI but UserAPI needs to call UserAction upon return
	// from the server. 
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
		},
		unfollowCompleted: function(){
			//don't really need to do anything as we should have already unfollowed. Can double check 
		},
		unfollowFailed: function(){
			//Will need to handle the error case, I.e. re-display the failed unfollow
			console.log('That unfollow failed ! ')
		},
		followCompleted: function(){
			//if we hit this our optimistic update is confirmed.
		},
		followFailed: function(){
			//Will need to handle the error case, I.e. display error message

		}
	};
	return UserActions;
});
