define(['../dispatcher/AppDispatcher', '../constants/AppConstants'], function(AppDispatcher){

	var _subscribedGroups = {}

	var AppStore = {

		unsubscribeFromGroup: function(id){
		console.log("UNSUBSCRIBE THAT SHIT")
		}
	}

	AppDispatcher.register(function(payload){

		var action = payload.action;
		var text;

		switch(action.actionType){

			case AppConstants.GROUP_UNSUBSCRIBE:
			AppStore.unsubscribeFromGroup(action.id)
		}

	})


	return AppStore;

})