define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _myCalendars = {};

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
			return _myCalendars;
		}
	};

	CalendarsStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case KronosConstants.RECEIVE_USER_CALS:
				_myCalendars = action.cals;
				CalendarsStore.emitChange();
				break;
			case KronosConstants.UPDATE_LAST_CAL:
				_myCalendars[_myCalendars.length - 1] = action.cal;
				CalendarsStore.emitChange();
				break;
		}
	});

	return CalendarsStore;

});