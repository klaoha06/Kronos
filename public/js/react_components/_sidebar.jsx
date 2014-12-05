define(['react'], function(React){
	var Sidebar = React.createClass({
	  render: function() {
	            return (
	              <div id="sidebar" className="debug col span_2">
	              <h1> Groups </h1>
	                <div id="myCalendars"></div>
	                <div id="popularCalendars"></div>
	              </div>
	            );
	          }
	});
	return Sidebar;
});