define(['flux'], function(flux){

	var Dispatcher = flux.Dispatcher;
	var AppDispatcher = new Dispatcher();

	AppDispatcher.handleViewAction = function(action){

		var payload = {
			source: 'VIEW_ACTION',
			action: action
		};
		this.dispatch(payload);
	};

	AppDispatcher.handleServerAction = function(action){
		var payload = {
			source: 'SERVER_ACTION',
			action: action
		};
		this.dispatch(payload);
	};

	return AppDispatcher;
});