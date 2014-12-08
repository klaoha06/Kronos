define(['react','jsx!react_components/_sidebar','jsx!react_components/_navbar'], function(React, Sidebar, Navbar) {
    var Container = React.createClass({
    render: function() {
              return (
                <div id="container">
                  <Navbar />
                  <div id="main-container" className="row gutters">
                    <Sidebar subscribedData = {[]}/>
                    <MainPanel />
                  </div>
                </div>
              );
            }
  });

<<<<<<< HEAD
  var Navbar = React.createClass({
    render: function() {
              return (
                <div id="navbar">
                  <input id="search" type="text" />
                  <div id="console">
                    <Authentication />
                  </div>
                </div>
              );
            }
  });

  var Authentication = React.createClass({

    getInitialState: function() {
      if (localStorage.getItem('access_token')) {
        return {loggedIn: true};
      } else {
        return {loggedIn: false};
      };

      // FB.getLoginStatus(function(response) {
      // console.log(response); // Response came too slow
      //   if (response.status === 'connected') {
      //     return {loggedIn: true};
      //   } else if (response.status === 'not_authorized') {
      //     return {loggedIn: false};
      //   } else {
      //     return {loggedIn: false};
      //   }
      // });
      // Will change in the future by comparing the current userId on the client-side with the server-side
    },

    FBlogin: function(e) {
      var that = this;
      FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
          console.log('Already Logged in.');
          that.setState({loggedIn: true});
        }
        else {
          FB.login(function(response) {
            if (response.authResponse) {
              console.log("Inside login?")
              var userFBId = response.id;
              var access_token = FB.getAuthResponse()['accessToken'];
              localStorage.setItem('access_token', access_token);
     

              // Getting User's Info
              FB.api('/me', function(response) {
                // console.log(response);
                localStorage.setItem('email', response.email);
                localStorage.setItem('userId', response.id);
                localStorage.setItem('username', response.name);
              });
              // Getting User's Profile Picture
              FB.api('/me/picture', {type: 'large', width: '300'}, function(response) {
                var profilePic = response.data.url;
                localStorage.setItem('profilePic', profilePic);
              });

              that.setState({loggedIn: true});

            } else {
              console.log('User cancelled login or did not fully authorize.');
              that.setState({loggedIn: false});
            }
          }, {scope: 'email,user_events,rsvp_event', return_scopes: true});
        }
      });
    },

    FBlogout: function(e) {
      this.setState({loggedIn: false});
      FB.logout(function(response) {
        localStorage.clear();
      }), {access_token: localStorage.getItem('access_token')};
    },

    render: function() {
      console.log(this.state.loggedIn);
      if (this.state.loggedIn) {
        return (
          // <img src={localStorage.getItem('profilePic')}>
          <button onClick={this.FBlogout}>Log Out</button>
        );
      } else {
        return (
          <button onClick={this.FBlogin}>Log In</button>
        );
      };
    }
  });


=======
>>>>>>> development
  var MainPanel = React.createClass({
    getInitialState: function() {
                       return { view: 'week' };
                     },

    changeView: function(view) {
                  this.setState({ view: view });
                },

    render: function() {
              return (
                <div id="main-panel" className="debug col span_10">
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

  React.render(<Container />, document.body);
});