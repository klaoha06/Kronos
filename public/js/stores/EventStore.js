define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, Constants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _futureEvents = {};
	var _pastEvents = {};

	function _addEvents(futureEvents, pastEvents){
		futureEvents.forEach(function(futureEvent) {
			if(!_futureEvents[futureEvent.eventInfo.id]){
				_futureEvents[futureEvent.eventInfo.id] = {
					id: futureEvent.eventInfo.id,
					name: futureEvent.eventInfo.name,
					startTime: futureEvent.eventInfo.start,
					endTime: futureEvent.eventInfo.end,
					picture: futureEvent.eventInfo.cover_pic,
					creator_id: futureEvent.creatorInfo.id,
					creator_name: futureEvent.creatorInfo.name,
					creator_username: futureEvent.creatorInfo.username
				};
			}
		});
	pastEvents.forEach(function(pastEvent) {
		if(!_pastEvents[pastEvent.eventInfo.id]){
			_pastEvents[pastEvent.eventInfo.id] = {
				id: pastEvent.eventInfo.id,
				name: pastEvent.eventInfo.name,
				startTime: pastEvent.eventInfo.start,
				endTime: pastEvent.eventInfo.end,
				picture: pastEvent.eventInfo.cover_pic,
				creator_id: pastEvent.creatorInfo.id,
				creator_name: pastEvent.creatorInfo.name,
				creator_username: pastEvent.creatorInfo.username
				}
			}
		});
	}


	var EventStore = {
		emit: function(event){
			EventEmitter.emit(event);
		},
		emitChange: function() {
		  	this.emit(CHANGE_EVENT);
		},
		addChangeListener: function(callback) {
		    EventEmitter.on(CHANGE_EVENT, callback);
		},
		getAllFutureEvents: function(){
			var events = [];
			for (var id in _futureEvents){
				events.push(_futureEvents[id]);
			}
			var sortedEvents = events.sort(function(a, b){ 
				return moment(b.startTime) - moment(a.startTime)
			});
			return sortedEvents;
		},
		getAllPastEvents: function(){
			var events = [];
			for (var id in _pastEvents){
				events.push(_pastEvents[id]);
			}
			var sortedEvents = events.sort(function(a, b){ 
				return moment(b.startTime) - moment(a.startTime)
			}) 
			return sortedEvents;
		}
	}

	EventStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;
		var text;

		switch(action.actionType){
			case Constants.RECEIVE_RAW_EVENTS:
				_addEvents(action.futureEvents, action.pastEvents);
				EventStore.emitChange();
				break;
			case Constants.RECEIVE_RAW_EVENTS:
				_addEvents(action.futureEvents, action.pastEvents);
				EventStore.emitChange();
				break;				
		}

	});

	return EventStore;

});