define(['dispatcher/KronosDispatcher', 'constants/KronosConstants'], function(Dispatcher, KronosConstants){
	var CalendarActions = {
		receiveUserCals: function(cals) {
			Dispatcher.handleServerAction({
			  actionType: KronosConstants.RECEIVE_USER_CALS,
			  cals: cals
			});
		},
		updateLastCal: function(cal) {
			Dispatcher.handleServerAction({
				actionType: KronosConstants.UPDATE_LAST_CAL,
				calFromServer: cal
			});
		},
		setMainCal: function(cal_id) {
			Dispatcher.handleViewAction({
				actionType: KronosConstants.SET_CURRENT_CAL,
				currentCalId: cal_id
			});
		},
		addEventToCal: function(event){
			Dispatcher.handleViewAction({
				actionType: KronosConstants.ADD_EVENT_TO_CAL,
				newEvent: event
			});
		},
		addOrUpdateCal: function(calEvent){
			Dispatcher.handleServerAction({
				actionType: KronosConstants.ADD_OR_UPDATE_CAL,
				calEvent: calEvent
			});
		}
	};
	return CalendarActions;
});

