//Following example here: http://stackoverflow.com/questions/25836038/why-isnt-this-requirejs-shim-working-for-react-router/25839328#25839328
//to use react-router with RequireJS

define(['react'], function(React) {
  "use strict";

  window.React = React;
});