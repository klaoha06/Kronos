define(['dispatcher/AppDispatcher', 'constants/UserConstants', 'event-emitter'], function(AppDispatcher, UserConstants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _currentUserId = {};

	function sessioningUser(userId) {
		console.log(userId);
		_currentUserId = userId;
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
		},
		clearSession: function(){
			_currentUserId = {};
		}
	};

	UserStore.dispatchToken = AppDispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case UserConstants.RECIEVE_USER_ID:
				sessioningUser(action.userId);
				UserStore.emitChange();
				break;
			case UserConstants.RECEIVE_RAW_UserS:

				UserStore.emitChange();
				break;				
		}

	});


	return UserStore;

});