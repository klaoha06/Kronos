define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _calendars = {};

	function sessioningCalendars(CalendarsId) {
		_currentCalendarsId = CalendarsId;
	}

	var CalendarsStore = {
		emit: function(event){
			EventEmitter.emit(event);
		},
		emitChange: function() {
	  	this.emit(CHANGE_EVENT);
		},
		addChangeListener: function(callback) {
	    EventEmitter.on(CHANGE_EVENT, callback);
		},
		getUserCals: function () {
			return _calendars;
		}
	};

	CalendarsStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case KronosConstants.RECEIVE_USER_CALS:
				_calendars = action.cals;
				CalendarsStore.emitChange();
				break;
		}
	});

	return CalendarsStore;

});