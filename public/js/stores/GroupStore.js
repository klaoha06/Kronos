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
  var _subscribedGroups = {};

  function _addGroups(rawGroups) {
    rawGroups.forEach(function(group) {
      if (!_subscribedGroups[group.id]) {
        _subscribedGroups[group.id] = {
          id: group.id,
          name: group.name
        };
      }
    });
  }

  var GroupStore = {
    emit: function(event) {
      EventEmitter.emit(event);
    },
    emitChange: function() {
      this.emit(CHANGE_EVENT);
    },
    addChangeListener: function(callback) {
      EventEmitter.on(CHANGE_EVENT, callback);
    },
    unsubscribeFromGroup: function(id) {
      delete _subscribedGroups[id];
    },
    getAllGroups: function() {
      return Object.keys(_subscribedGroups).map(function(id) {
        return _subscribedGroups[id];
      });
    }
  };

  GroupStore.dispatchToken = Dispatcher.register(function(payload){
    var action = payload.action;
    switch(action.actionType) {
      case Constants.GROUP_UNSUBSCRIBE:
        GroupStore.unsubscribeFromGroup(action.id);
        GroupStore.emitChange();
        break;
      case Constants.RECEIVE_RAW_GROUPS:
        _addGroups(action.rawGroups);
        GroupStore.emitChange();
        break;				
    }
  });
  return GroupStore;
});
