define(['dispatcher/KronosDispatcher', 'constants/KronosConstants'], function(Dispatcher, Constants){

	var EventServerActions = {
		loadAllEvents: function(rawEvents){
			Dispatcher.handleServerAction({
				actionType: Constants.RECEIVE_RAW_EVENTS,
				futureEvents: rawEvents.futureEvents,
				pastEvents: rawEvents.pastEvents
			});
		},
		unsubscribeCompleted: function(){

		},
		unsubscribeFailed: function(){

		}
	};
	return EventServerActions

});