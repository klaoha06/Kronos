define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'utils/EventWebAPIUtils'], function(Dispatcher, Constants, EventAPI){
	var EventViewActions = {
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
	return EventViewActions
});