define(['flux'], function(flux) {
  var Dispatcher = flux.Dispatcher;
  var KronosDispatcher = new Dispatcher();

  KronosDispatcher.handleViewAction = function(action) {
    var payload = {
      source: 'VIEW_ACTION',
      action: action
    };
    this.dispatch(payload);
  };

  KronosDispatcher.handleServerAction = function(action) {
    var payload = {
      source: 'SERVER_ACTION',
      action: action
    };
    this.dispatch(payload);
  };

  return KronosDispatcher;
});
