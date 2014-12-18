define(['flux'], function(flux){

	var Dispatcher = flux.Dispatcher;
	var GroupDispatcher = new Dispatcher();

	GroupDispatcher.handleViewAction = function(action){

		var payload = {
			source: 'VIEW_ACTION',
			action: action
		};
		this.dispatch(payload);
	};

	GroupDispatcher.handleServerAction = function(action){
		var payload = {
			source: 'SERVER_ACTION',
			action: action
		};
		this.dispatch(payload);
	};

	return GroupDispatcher;
});