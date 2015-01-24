define(['react', 'jquery', 'react-router','serverSetup', 'stores/GroupStore', 'stores/UserStore', 'jsx!react_components/sidebar/_calendars'], function(React, $, Router, api, GroupStore, UserStore, MyCalendars){
	var Link = Router.Link;
	function getStateFromStores(){
		return{
			data: GroupStore.getAllGroups()
		};
	}

	function renderGroups(that){
		var dataNodes=that.state.data.map(function(group, index){
			return(
				<Link to="Groups" params={group}>
				<div className={that.props.name + " debug sidebarItem"} key={index} id={"group-"+group.id}>
					{group.name}
				</div>
				</Link>
			);
		});
		return (
			<li id={that.props.name} className="row debug">
				<h4 onClick={that.handleClick}>{that.props.name}</h4>
				<div className={that.props.name + "Container hide sidebarMenu debug"}>
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
		}
	});


	var Sidebar = React.createClass({
		getInitialState: function(){
			return{user_id: $.cookie('user_id')};
		},
		componentDidMount: function(){
			UserStore.addChangeListener(this._onChange);
		},
		_onChange: function(){
			this.setState({user_id: $.cookie('user_id')});
		},
		render: function() {
			//I commented out groups. I honestly feel we should be focussing on the more granular
			//levels first. Once we have events/calendars, then we can add groups where it fits but 
			//I think starting smaller first and building from there is better. 
			var user_id = $.cookie('user_id')
				if ($.cookie('access_token')) {
					return (
					  <div id="sidebar" className="debug col span_2">
					  {/*<h1>Groups </h1>
					  	<ul id="sidebarList" className="debug">
					  		<SubscribedGroups name= "subscribed" url= {"/users/"+user_id+"/subscriptions"} />
					  		<PopularGroups name= "popular" url="/groups/popular" />
					  	</ul>*/}
					<h1>My Calendars</h1>
						<MyCalendars />

						<h1>Trending Calendars</h1>

					</div>

					);
				} else {
			    return (
			      <div id="sidebar" className="debug col span_2">
			      	<h1>Trending Calendars</h1>
			      {/*<h1>Groups </h1>}
			      			      	<ul id="sidebarList" className="debug">
			      			      		<SubscribedGroups name= "subscribed" url= {"/users/"+user_id+"/subscriptions"} />
			      			      		<PopularGroups name= "popular" url="/groups/popular" />
			      			      	</ul>*/}
			      </div>
			    );
				}
		  }	
	});

	return Sidebar;

});