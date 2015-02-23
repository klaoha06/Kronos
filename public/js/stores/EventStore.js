define([
  'dispatcher/KronosDispatcher',
  'constants/KronosConstants',
  'event-emitter'],
  function(
    Dispatcher,
    Constants,
    events
  ) {
  var CHANGE_EVENT = 'change';
  var EventEmitter = new events();
  var _futureEvents = {};
  var _pastEvents = {};
  var _eventDetails = {};

  function _addEvents(futureEvents, pastEvents) {
    addEvents(futureEvents, _futureEvents);
    addEvents(pastEvents, _pastEvents);
  }

  function addEvents(events, eventBucket) {
    events.forEach(function(e) {
      if(!eventBucket[e.eventInfo.id]) {
        eventBucket[e.eventInfo.id] = {
          id: e.eventInfo.id,
          name: e.eventInfo.title,
          startTime: e.eventInfo.start,
          endTime: e.eventInfo.end,
          picture: e.eventInfo.cover_pic,
          description: e.eventInfo.description,
          creator_id: e.creatorInfo.id,
          creator_name: e.creatorInfo.name,
          creator_username: e.creatorInfo.username,
          userAddedEvent: e.addedEvent
        };
      }
    });
  }

  function _addEventDetails(eventDetails) {
    _eventDetails = {
      id: eventDetails.id,
      title: eventDetails.title,
      startTime: eventDetails.start,
      endTime: eventDetails.end,
      location: eventDetails.location,
      picture: eventDetails.cover_pic,
      description: eventDetails.description,
      creatorId: eventDetails.creator_id,
      creatorName: eventDetails.owner_name,
      userAddedEvent: e.addedEvent
    };
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
    removeChangeListener: function(callback) {
      EventEmitter.removeListener(CHANGE_EVENT, callback);
    },
    getAllFutureEvents: function() {
      var events = [];
      for (var id in _futureEvents){
        events.push(_futureEvents[id]);
      }
      var sortedEvents = events.sort(function(a, b){
        return moment(b.startTime) - moment(a.startTime)
      });
      return sortedEvents;
    },
    getAllPastEvents: function() {
      var events = [];
      for (var id in _pastEvents){
        events.push(_pastEvents[id]);
      }
      var sortedEvents = events.sort(function(a, b){
        return moment(b.startTime) - moment(a.startTime)
      });
      return sortedEvents;
    },
    getEventDetails: function() {
      return _eventDetails;
    }
  }

  EventStore.dispatchToken = Dispatcher.register(function(payload) {
    var action = payload.action;
    var text;

    switch (action.actionType){
      case Constants.RECEIVE_RAW_EVENTS:
        _addEvents(action.futureEvents, action.pastEvents);
        EventStore.emitChange();
        break;			
      case Constants.RECEIVE_EVENT_DETAILS:
        _addEventDetails(action.eventDetails);
        EventStore.emitChange();
        break;
    }
  });

  return EventStore;
});
