define(['dispatcher/KronosDispatcher', 'constants/KronosConstants', 'event-emitter'], function(Dispatcher, Constants, events){
	var CHANGE_EVENT = 'change';
	var EventEmitter = new events();
	var _followers = {}
	var _following = {}

	function _addFriends(friends){
		friends.followers.forEach(function(follower){
			if(!_followers[follower.id]){
				_followers[follower.id] = follower
			}
		})

		friends.following.forEach(function(user_following){
			if(!_following[user_following.id]){
				_following[user_following.id] = user_following
			}
		})
	}



	var FriendStore = {
		emit: function(event){
			EventEmitter.emit(event);
		},
		emitChange: function() {
		  	this.emit(CHANGE_EVENT);
		},
		addChangeListener: function(callback) {
		    EventEmitter.on(CHANGE_EVENT, callback);
		},
		getAllFollowers: function(){
			followers_array = [];
			for(var id in _followers){
				followers_array.push(_followers[id])
			}
			return followers_array;
		},
		getAllFollowing: function(){
			following_array = []
			for(var id in _following){
				following_array.push(_following[id])
			}
			return following_array;
		},
		unfollow: function(id){
			delete _following[id]
		}
	}
	FriendStore.dispatchToken = Dispatcher.register(function(payload){
		var action = payload.action;

		switch(action.actionType){

			case Constants.RECEIVE_RAW_FRIENDS:
				_addFriends(action.friends)
				FriendStore.emitChange();
			break;
			case Constants.UNFOLLOW:
				FriendStore.unfollow(action.id)
				FriendStore.emitChange();
			break;
		}

	});

	return FriendStore;
});