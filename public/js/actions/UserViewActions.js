define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'utils/UserUtils'], function(Dispatcher, Constants, UserAPI){
	var UserViewActions = {
		unFollow: function(follow_id){
			Dispatcher.handleViewAction({
				actionType: Constants.UNFOLLOW,
				id: follow_id
			});

			UserAPI.unFollow(follow_id)
		}
	}

	return UserViewActions
});