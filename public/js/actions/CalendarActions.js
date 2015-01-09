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
		updateCurrentCal: function(cal_id) {
			Dispatcher.handleViewAction({
				actionType: KronosConstants.UPDATE_CURRENT_CAL,
				currentCalId: cal_id
			});
		}
	};
	return CalendarActions;
});

