define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _myCalendars = {};
	var _currentCalendar = {};

	function displayNewCal(cal_id){
		_currentCalendar = _myCalendars[cal_id];
	}

	function addEventToCal(event, cal_id){
		console.log(cal_id);
		if(cal_id === undefined)
			_myCalendars['main'].events.push(event)
		else
			_myCalendars[cal_id].events.push(event)
	}

	// function updateEventInCalByCalId(cal_id, event){
	// 	_myCalendars.map(function(calendarEvent){
	// 		if (calendarEvent.cal.id == cal_id) {
	// 			calendarEvent.events.push(event);
	// 		}
	// 	});
	// }

	// function addOrUpdateCal(calEvent){
	// 	var calendar = $.grep(_myCalendars, function(calendarEvent){ 
	// 		return calendarEvent.cal.id == calEvent.cal.id;
	// 	});
	// 	if (calendar.length !== 0) {
	// 		calendar = calEvent;
	// 	} else {
	// 		_myCalendars.push(calEvent);
	// 	}
	// }

	function addCals(cals){		
		cals.forEach(function(calEvent){
			if(!_myCalendars[calEvent.cal.id])
			{
				if(calEvent.cal.main_cal === true)
				{
					_currentCalendar = calEvent;
					_myCalendars['main'] = calEvent;
					return
				}
				_myCalendars[calEvent.cal.id] = calEvent;

			}
		})
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
		removeChangeListener: function(callback) {
		  EventEmitter.removeListener(CHANGE_EVENT, callback);
		},
		getUserCals: function () {
			var calArr = []
			for(var cal in _myCalendars){
				calArr.push(_myCalendars[cal]);
			}
			return calArr;
		},
		getCurrentCal: function() {
			return _currentCalendar;
		},
	};

	CalendarsStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case KronosConstants.RECEIVE_USER_CALS:
				addCals(action.cals);
				CalendarsStore.emitChange();
				break;
			case KronosConstants.UPDATE_LAST_CAL:
				_myCalendars[_myCalendars.length - 1] = {cal: action.calFromServer, events: []};
				CalendarsStore.emitChange();
				break;
			case KronosConstants.SET_CURRENT_CAL:
				displayNewCal(action.currentCalId);
				CalendarsStore.emitChange();
				break;
			case KronosConstants.ADD_EVENT_TO_CAL:
				addEventToCal(action.event, action.calendar_id);
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
