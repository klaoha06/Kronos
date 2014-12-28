define(['dispatcher/KronosDispatcher', 'constants/KronosConstants'], function(Dispatcher, KronosConstants){
	var CalendarActions = {
		receiveUserCals: function(cals) {
			Dispatcher.handleServerAction({
			  actionType: KronosConstants.RECEIVE_USER_CALS,
			  cals: cals
			});
		}
	};
	return CalendarActions;
});

