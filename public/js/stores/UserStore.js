define(['dispatcher/AppDispatcher', 'constants/UserConstants', 'event-emitter'], function(AppDispatcher, UserConstants, events){
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
		currentUser: function(){
			return _currentUserId;
		}
	};

	UserStore.dispatchToken = AppDispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case UserConstants.RECEIVE_USER_ID:
				sessioningUser(action.userId);
				UserStore.emitChange();
				break;
			case UserConstants.ClEAR_USER_ID:
				clearSession();
				UserStore.emitChange();
				break;				
		}

	});


	return UserStore;

});