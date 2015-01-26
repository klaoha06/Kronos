define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, KronosConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _currentUserId = false;

	function sessioningUser(userId) {
		_currentUserId = userId;
	}

	function clearSession(){
		_currentUserId = false;
	}

	var UserStore = {
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
		currentUser: function(){
			return _currentUserId;
		}
	};

	UserStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case KronosConstants.RECEIVE_USER_ID:
				sessioningUser(action.userId);
				UserStore.emitChange();
				break;
			case KronosConstants.CLEAR_USER_ID:
				clearSession();
				UserStore.emitChange();
				break;				
		}

	});


	return UserStore;

});