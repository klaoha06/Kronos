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
				cal: cal
			});
		}
	};
	return CalendarActions;
});

