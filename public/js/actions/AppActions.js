define(['../dispatcher/AppDispatcher', '../constants/AppConstants'], function(AppDispatcher, AppConstants){

	var AppActions = {
		unsubscribeGroup: function(group){
			console.log(group)
			AppDispatcher.handleViewAction({
				actionType: AppConstants.GROUP_UNSUBSCRIBE,
				id: group.id
			});
		}
	}

	return AppActions;

})