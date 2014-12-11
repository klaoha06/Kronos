define(['react'], function(React) {
    var Container = React.createClass({
    render: function() {

            // Setup Ajax call (all ajax calls will be authenticated)
            $.ajaxSetup({
                beforeSend: function(xhr) {

                  function getCookie(cname) {
                      var name = cname + "=";
                      var ca = document.cookie.split(';');
                      for(var i=0; i<ca.length; i++) {
                          var c = ca[i];
                          while (c.charAt(0)==' ') c = c.substring(1);
                          if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
                      }
                      return "";
                  }

                  if (Date.now() - localStorage.getItem('loggedInTime') < 10800000) {
                    xhr.setRequestHeader('access_token', getCookie('access_token'));
                  } else {
                    localStorage.clear();
                    console.log("can't send data before login");
                  }
                }
            });

              return (
                    <MainPanel />
              );  
            }
  });

  var MainPanel = React.createClass({
    getInitialState: function() {
                       return { view: 'week' };
                     },

    changeView: function(view) {
                  this.setState({ view: view });
                },

    render: function() {
              return (
                <div id="main-calendar">
                  <ViewOptions changeView={this.changeView} />
                  <CalendarView view={this.state.view} />
                </div>
              );
            }
  });

  var ViewOptions = React.createClass({
    handleClick: function(e) {
                  var view = e.currentTarget.id;
                  this.props.changeView(view);
                 },

    render: function() {
              return (
                <div id="view-options" className="debug cf">
                  <div id="pagination">
                    <button id="now">Now</button>
                    <button id="last">Last</button>
                    <button id="next">Next</button>
                  </div>
                  <div id="view-buttons">
                    <button id="day" onClick={this.handleClick}>Day</button>
                    <button id="week" onClick={this.handleClick}>Week</button>
                    <button id="month" onClick={this.handleClick}>Month</button>
                    <button id="year" onClick={this.handleClick}>Year</button>
                  </div>
                </div>
              );
            }
  });

  var CalendarView = React.createClass({
    render: function() {
              if (this.props.view == 'week') {
                return (
                  <div id="calendar-view">
                    <WeekView />
                  </div>
                );
              } else if (this.props.view == 'month') {
                return (
                  <div id="calendar-view">
                    <MonthView />
                  </div>
                );
              }
            }
  });

  var WeekView = React.createClass({
    render: function() {
              return (
                <div id="week-view">
                  <div id="monday" className="weekday"></div>
                  <div id="tuesday" className="weekday"></div>
                  <div id="wednesday" className="weekday"></div>
                  <div id="thursday" className="weekday"></div>
                  <div id="friday" className="weekday"></div>
                  <div id="saturday" className="weekday"></div>
                  <div id="sunday" className="weekday"></div>
                </div>
              );
            }
  });

  var MonthView = React.createClass({
    render: function() {
              return (
                <div id="month-view">
                  <div className="week rows">
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                  </div>
                  <div className="week rows">
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                  </div>
                  <div className="week rows">
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                  </div>
                  <div className="week rows">
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                    <div className="day"></div>
                  </div>
                </div>
              );
            }
  });
  return Container;
});