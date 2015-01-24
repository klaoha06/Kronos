define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'utils/UserUtils'], function(Dispatcher, Constants, UserAPI){
	var UserViewActions = {
		unfollow: function(follow_id){
			//Optimistically unfollow.
			Dispatcher.handleViewAction({
				actionType: Constants.UNFOLLOW,
				id: follow_id
			});

			UserAPI.unfollow(follow_id)
		},
		follow: function(follow_id){
			//Optimistically follow. 
			Dispatcher.handleViewAction({
				actionType: Constants.FOLLOW,
				id: follow_id
			});

			UserAPI.follow(follow_id)
		}
	}

	return UserViewActions
});