define(['react', 'jquery', 'react-router', 'API_URL', 'actions/GroupViewActions'], function(React, $, Router, API_URL, GroupViewActions){
	
	var Link = Router.Link;

	var ShowGroup = React.createClass({

		mixins: [ Router.State ], //This is so that we have access to this.getParams to get the ID in the URL

		handleUnsubscribe: function(e){
			GroupViewActions.unsubscribeGroup(this.props.id)
		},

		render: function(){
			var calendarNodes = this.props.calendars.map(function(calendar, index){

				return(
					<div key={index} className = {calendar.name + " debug calendarContainer"}>
					<h2><Link to="Calendar" params={calendar}> {calendar.name} </Link></h2>
					</div>
					)
			});
			return(
				<div>
					<button onClick={this.handleUnsubscribe}>Unsubscribe</button>
					<h6>Group: </h6><h1>{this.props.name}</h1>
					<h6>Calendars: </h6>
					{calendarNodes}
				</div>
				)
		}
	})

	var Group = React.createClass({
		mixins: [ Router.State ],

		loadDataFromServer: function(){
			var that = this;
			$.ajax({
				url: API_URL + '/groups/'+this.getParams().id,
				dataType: 'json',
				context: this
			}).done(function(data){
				this.setState({name: data.name, calendars: data.calendars, id: this.getParams().id});
			}).fail(function(data){
				console.log("FAILED REQUEST")
			})
		},
		getInitialState: function(){
			this.loadDataFromServer()
			return {name: "", calendars: []}
		},
		componentWillReceiveProps: function () {
		    this.setState(this.loadDataFromServer());
		 },
		render: function(){
			return(
				<div className="groupContainer">
					<ShowGroup name={this.state.name} calendars={this.state.calendars} id={this.state.id} />
				</div>
				)
		}
	})
	return Group;
});