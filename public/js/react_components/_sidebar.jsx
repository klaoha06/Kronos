define(['react', 'jquery', 'react-router'], function(React, $, Router){
	var Link = Router.Link
	var Submenu = React.createClass({
		loadDataFromServer: function(){
			var that = this
			$.ajax({
				url: '/api/v0/' + this.props.url,
				dataType: 'json',
				context: this
			}).done(function(data){
				this.setState({data: data});
			}).fail(function(data){
				console.log("FAILED REQUEST")
			})
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
			var that = this
			var dataNodes = this.state.data.map(function(group, index){
				var classes= that.props.name + " debug  sidebarItem"
				return(
					<div className={classes} key={index}>
						{group.name}
					</div>
				);
			});
			classes = this.props.name + "Container hide sidebarMenu debug"
			return (
				<li id={this.props.name} className="row debug">
					<h4  onClick={this.handleClick}>{this.props.name}</h4>
					<div className={classes}>
						{dataNodes}
					</div>
				</li>
			
		  	);
		}
	});


	var Sidebar = React.createClass({		
		render: function() {
			var subMenus = [{name: "subscribed", url: "users/1/subscriptions"}, {name: "popular", url: "popular"}]
			var subscribedNodes = subMenus.map(function(submenu, index){
				return(
					<Submenu name={submenu.name} url={submenu.url} key={index}/>
				);
			});

		    return (
		      <div id="sidebar" className="debug col span_2">
		      <h1><Link to="Groups"> Groups </Link></h1>
		      	<ul id="sidebarList" className="debug">
		      		{subscribedNodes}
		      		
		      	</ul>
		      </div>
		    );
		  }	
	});

	return Sidebar;
});