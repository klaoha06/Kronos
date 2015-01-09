define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _myCalendarsEvents = {};
	var _currentCalendar = {};

	function setMainCal(){
		_myCalendarsEvents.map(function(calendarEvent){
			if (calendarEvent.cal.main_cal === true) {
				_currentCalendar = calendarEvent;
				console.log(_currentCalendar);
			}
		});
	}

	function getCalEventsByCalId(cal_id){
		_myCalendarsEvents.map(function(calendarEvent){
			if (calendarEvent.cal.id === cal_id) {
				_currentCalendar = calendarEvent;
				console.log(_currentCalendar);
			}
		});
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
			return _myCalendarsEvents;
		},
		getCurrentCal: function() {
			return _currentCalendar;
		}
	};

	CalendarsStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case KronosConstants.RECEIVE_USER_CALS:
				_myCalendarsEvents = action.cals;
				setMainCal();
				CalendarsStore.emitChange();
				break;
			case KronosConstants.UPDATE_LAST_CAL:
				_myCalendarsEvents[_myCalendarsEvents.length - 1] = {cal: action.calFromServer, events: []};
				CalendarsStore.emitChange();
				break;
			case KronosConstants.SET_CURRENT_CAL:
				getCalEventsByCalId(action.currentCalId);
				CalendarsStore.emitChange();
				break;
		}
	});

	return CalendarsStore;

});