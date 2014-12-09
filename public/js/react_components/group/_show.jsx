define(['react', 'jquery', 'react-router', '../../serverUrl'], function(React, $, Router, api){
	var Group = React.createClass({

		render: function(){
			var calendarNodes = this.props.calendars.map(function(calendar, index){

				return(
					<div key={index} className = {calendar.name + " debug calendarContainer"}>
					<h2> {calendar.name} </h2>
					</div>
					)
			});
			return(
				<div>
					<h6>Group: </h6><h1>{this.props.name}</h1>
					<h6>Calendars: </h6>
					{calendarNodes}
				</div>
				)
		}
	})

	var GroupView = React.createClass({
		mixins: [ Router.State ],

		loadDataFromServer: function(){
			var that = this;
			$.ajax({
				url: api + '/groups/'+this.getParams().id,
				dataType: 'json',
				context: this
			}).done(function(data){
				this.setState({name: data.name, calendars: data.calendars});
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
			console.log(this.state.name)
			console.log(this.state.calendars)
			return(
				<div className="groupContainer">
					<Group name={this.state.name} calendars={this.state.calendars} />
				</div>
				)
		}
	})
	return GroupView;
});