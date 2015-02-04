define([
  'react',
  'jquery',
  'react-router',
  'jsx!react_components/sidebar/_myCalendars',
  'jsx!react_components/sidebar/_myGroups'
  ],
  function(
    React,
    $,
    Router,
    MyCalendars,
    MyGroups
  ) {
  var Link = Router.Link;

  var Sidebar = React.createClass({
    mixins: [Router.State],
    render: function() {
      if (!this.props.loggedInUser) {
        return(<div id="sidebar" className="debug col span_2"></div>)
      }
      var userInfo = JSON.parse(localStorage.getItem('userInfo'));
      //FJ 2/3 -- there's kind of a lot of redundancy with the sidebarItems.
      //We should be able to refactor to make this cleaner.
      return (
        <div id="sidebar" className="debug col span_2">
          <ul id="sidebarList" className="debug">
            <li className={this.isActive('UserPage') ? "sidebarItem profileInfo cf activeSidebar" : "sidebarItem profileInfo cf"}>
              <Link to="UserPage" params={{id: this.props.loggedInUser}}>
                <img className="profilePic" src={userInfo.profilePic} />
                <p className="profileName">{userInfo.first_name} <br /> {userInfo.last_name}</p>
              </Link>
            </li>
            <hr />
            <li className="sidebarItem">
              <Link to="Feed">
                <h5 className={this.isActive('Feed') ? 'activeSidebar sidebarSubheader' : 'sidebarSubheader'}> News Feed </h5>
              </Link>
            </li>
            <hr />
            <li className="sidebarItem">
              <Link to="Friendships" params={{id: this.props.loggedInUser}} title="Manage followers">
                <h5 className={this.isActive('Friendships') ? 'activeSidebar sidebarSubheader' : 'sidebarSubheader'}> Friends </h5>
              </Link>
            </li>
            <hr />
            <li className="sidebarItem">
              <Link to="UserSuggestions">
               <h5 className={this.isActive('UserSuggestions') ? 'activeSidebar sidebarSubheader' : 'sidebarSubheader'}> Who To Follow </h5>
              </Link>
            </li>
            <hr />
            <li className="sidebarItem">
               <h4 className={this.isActive('UserCalendar') ? 'activeHeader sidebarHeader' : "sidebarHeader"}>My Calendars</h4>
               <MyCalendars loggedInUser={this.props.loggedInUser} />
             </li>
            <hr />
            <li className="sidebarItem">
              <h4 className={this.isActive('Groups') ? 'activeHeader sidebarHeader' : "sidebarHeader"}>Groups </h4>
              <MyGroups loggedInUser={this.props.loggedInUser} />
            </li>
          </ul>
        </div>
      );
    }	
  });
  return Sidebar;
});
