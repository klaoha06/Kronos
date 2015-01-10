define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _myCalendarsEvents = {};
	var _currentCalendar = {};

	function setMainCal(){
		_myCalendarsEvents.map(function(calendarEvent){
			if (calendarEvent.cal.main_cal === true) {
				_currentCalendar = calendarEvent;
			}
		});
	}

	function setCalEventsByCalId(cal_id){
		_myCalendarsEvents.map(function(calendarEvent){
			if (calendarEvent.cal.id === cal_id) {
				_currentCalendar = calendarEvent;
			}
		});
	}

	function updateEventInCalByCalId(cal_id, event){
		_myCalendarsEvents.map(function(calendarEvent){
			if (calendarEvent.cal.id == cal_id) {
				calendarEvent.events.push(event);
			}
		});
	}

	function addOrUpdateCal(calEvent){
		var calendar = $.grep(_myCalendarsEvents, function(calendarEvent){ 
			return calendarEvent.cal.id == calEvent.cal.id;
		});
		if (calendar) {
			calendar = calEvent;
		} else {
			_myCalendarsEvents.push(calEvent);
		}
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
				setCalEventsByCalId(action.currentCalId);
				CalendarsStore.emitChange();
				break;
			case KronosConstants.ADD_EVENT_TO_CAL:
				updateEventInCalByCalId(action.newEvent.calendar_id, action.newEvent.event);
				CalendarsStore.emitChange();
				break;
			case KronosConstants.ADD_OR_UPDATE_CAL:
				addOrUpdateCal(action.calEvent);		
				CalendarsStore.emitChange();
				break;
		}
	});

	return CalendarsStore;

});