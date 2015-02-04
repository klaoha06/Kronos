define([
  'actions/GroupServerActions',
  'stores/UserStore'],
  function(
    GroupServerActions,
    UserStore
  ) {
  var GroupAPIs = {
    retrieveSubscribedGroups: function() {
      $.get(API_URL + '/users/' + UserStore.currentUser() + '/groups')
        .done(GroupServerActions.loadAllGroups)
        .fail(function(data) { console.log("FAILED REQUEST"); });
    },
    unsubscribeGroup: function(id) {
      var url = "/users/" + UserStore.currentUser() + "/unsubscribe_group"
      $.ajax({
        url: API_URL + url,
        method: 'DELETE',
        data: {group_id: id}
      })
        .done(GroupServerActions.unsubscribeCompleted)
        .fail(GroupServerActions.unsubscribeFailed);
    }
  };
  return GroupAPIs;
});
