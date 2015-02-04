//Returns: MyGroups
//Description: Renders the list of groups to be displayed in the Sidebar component. 
define([
  'react', 
  'react-router', 
  'stores/GroupStore'],
  function(
    React, 
    Router, 
    GroupStore
  ){
    var Link = Router.Link

    function getStateFromStores() {
      return { data: GroupStore.getAllGroups() };
    }

    function renderGroups(that) {
      var dataNodes = that.state.data.map(function(group, index) {
        return (
          <Link to="Groups" params={group}>
            <div className={that.props.name + " debug"} key={index} id={"group-"+group.id}>
              {group.name}
            </div>
          </Link>
        );
      });
      return (
        <div id={that.props.name} className="row debug">
          <h5 className="sidebarSubheader" onClick={that.handleClick}>{that.props.name}</h5>
          <div className={that.props.name + "Container hide sidebarMenu debug"}>
            {dataNodes}
          </div>
        </div>
      );
    }
    //Subscribed Groups uses flux. Note that it grabs the groups from the Group Store
    //And it adds a listener for when the GroupStore has changed. 
    var SubscribedGroups = React.createClass({
      getInitialState: function() {
        return { data: [] };
      },
      componentDidMount: function() {
        GroupStore.addChangeListener(this._onChange);
      },
      handleClick: function(e) {
        $(e.target).closest("li").find(".sidebarMenu").slideToggle();
      },
      render: function(){
        return renderGroups(this);
      },
      _onChange: function() {
        this.setState(getStateFromStores());
      }
    });
    //Popular groups does not use Flux. This will change much less frequently, so probably
    //Just loading it initially via LoadDataFromServer is all it needs. 
    var PopularGroups = React.createClass({
      loadDataFromServer: function() {
        $.get(API_URL + this.props.url)
          .done(function(data) {
            this.setState({ data: data });
          }.bind(this))
          .fail(function(data) {
            console.log("FAILED REQUEST");
          }.bind(this));
      },
      getInitialState: function() {
        return { data: [] };
      },
      componentDidMount: function() {
        this.loadDataFromServer();
      },
      handleClick: function(e) {
        this.loadDataFromServer();
        $(e.target).closest("li").find(".sidebarMenu").slideToggle();
      },
      render: function() {
        return renderGroups(this);
      }
    });
    var MyGroups = React.createClass({
      render: function(){
        return(
          <div>
            <SubscribedGroups name= "subscribed" url= {"/users/"+this.props.loggedInUser+"/subscriptions"} />
            <PopularGroups name= "popular" url="/groups/popular" />
          </div>
          )
      }
    })

    return MyGroups
});
