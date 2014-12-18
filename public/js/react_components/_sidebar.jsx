define(['react', 'jquery', 'react-router','serverSetup', 'utils/GroupWebAPIUtils', 'stores/GroupStore'], function(React, $, Router, api, GroupAPI, GroupStore){
	var Link = Router.Link;
	function getStateFromStores(){
		return{
			data: GroupStore.getAllGroups()
		};
	}

	function renderGroups(that){
		var dataNodes=that.state.data.map(function(group, index){
			var classes= that.props.name + " debug sidebarItem";
			return(
				<Link to="Groups" params={group}>
				<div className={classes} key={index} id={"group-"+group.id}>
					{group.name}
				</div>
				</Link>
			);
		});
		classes = that.props.name + "Container hide sidebarMenu debug"
		return (
			<li id={that.props.name} className="row debug">
				<h4 onClick={that.handleClick}>{that.props.name}</h4>
				<div className={classes}>
					{dataNodes}
				</div>
			</li>
		
	  	);

	}
	//Subscribed Groups uses flux. Note that it grabs the groups from the Group Store
	//And it adds a listener for when the GroupStore has changed. 
	var SubscribedGroups = React.createClass({
		getInitialState: function(){
			return {data: []};
		},
		componentDidMount: function(){
			GroupStore.addChangeListener(this._onChange);
		},
		handleClick: function(e){
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
		loadDataFromServer: function(){
			var that = this;
			$.ajax({
				url: api + this.props.url,
				dataType: 'json',
				context: this
			}).done(function(data){
				this.setState({data: data});
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});
		},
		getInitialState: function(){
			return {data: []};
		},
		componentDidMount: function(){
			this.loadDataFromServer();
		},
		handleClick: function(e){
			this.loadDataFromServer();
			$(e.target).closest("li").find(".sidebarMenu").slideToggle();
		},
		render: function(){
			return renderGroups(this);
		
		},
	});

	var Sidebar = React.createClass({
		render: function() {
			var user_id = localStorage.getItem('userId')
		    return (
		      <div id="sidebar" className="debug col span_2">
		      {/*<i className="fa fa-exchange" id="sideBarSlider" onClick={this.toggleSlider}></i>*/}
		      <h1>Groups </h1>
		      	<ul id="sidebarList" className="debug">
		      		<SubscribedGroups name= "subscribed" url= {"/users/"+user_id+"/subscriptions"} />
		      		<PopularGroups name= "popular" url="/popular" />
		      	</ul>
		      </div>
		    );
		  }	
	});

	return Sidebar;
});