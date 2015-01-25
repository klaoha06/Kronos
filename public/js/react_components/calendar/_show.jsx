define(['react', 'jquery', 'react-router', 'API_URL'], function(React, $, Router, API_URL){
	var Link = Router.Link
	var ShowCalendar = React.createClass({

		render: function(){
			// var eventNodes = this.props.calendars.map(function(calendar, index){

			// 	return(
			// 		<div key={index} className = {calendar.name + " debug calendarContainer"}>
			// 		<h2> {calendar.name} </h2>
			// 		</div>
			// 		)
			// });
			return(
				<div>
					<h6>ID: {this.props.calendar.id} </h6>
					<h6>Creator ID: {this.props.calendar.creator_id} </h6>
					<h6>Created At: {this.props.calendar.created_at} </h6>
					<h6>Calendar: </h6><h1>{this.props.calendar.name}</h1>
					<h6>Events: </h6>
					{/*eventNodes*/}
				</div>
				)
		}
	})


	var Calendar = React.createClass({
		mixins: [ Router.State ],

		loadDataFromServer: function(){
			var that = this;
			$.ajax({
				url: API_URL + '/calendars/'+this.getParams().id,
				dataType: 'json',
				context: this
			}).done(function(data){
				console.log(data)
				this.setState({calendar: data});
			}).fail(function(data){
				console.log("FAILED REQUEST")
			})
		},
		getInitialState: function(){
			this.loadDataFromServer()
			return {calendar: {}}
		},
		componentWillReceiveProps: function () {
		    this.setState(this.loadDataFromServer());
		 },
		render: function(){
			console.log()
			return(
				<div className="calendarContainer">
					<ShowCalendar calendar={this.state.calendar} />
				</div>
				)
		}
	})
	return Calendar;
})