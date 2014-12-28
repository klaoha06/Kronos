define(['react', 'jquery', 'react-router','serverSetup', 'stores/CalendarStore' , 'actions/CalendarActions', 'utils/CalendarWebAPIUtils'], function(React, $, Router, api, CalendarStore, CalendarActions, CalendarAPI){
	function getCalsStore() {
		return {cals: CalendarStore.getUserCals()};
	}

	var MyCalendars = React.createClass({
		getInitialState: function(){
			return {cals: []};
		},

		componentDidMount: function(){
			CalendarStore.addChangeListener(this._onChange);
			CalendarAPI.getUserCals();
		},
		_onChange: function() {
			this.setState(getCalsStore());
		},

		render: function() {
			return (
				<UserCalsList data={this.state.cals}/>
			)
		}

	});

	var UserCalsList = React.createClass({
		render: function () {
			console.log(this.props.data);
			var CalNodes = this.props.data.map(function(calendar, index) {
				return (
					<div className="row debug">
						<Calendar data={calendar} key={index}></Calendar>
					</div>
				)
			});
			return (
				<div className="UserCals">
					{CalNodes}
				</div>
			)
		}
	});

	var Calendar = React.createClass({
		handleClick: function(e){
			console.log(this.props.data.id)
		},
		render: function () {
			return (
				<p onClick={this.handleClick}>{this.props.data.name}</p>
			);
		}
	})

	return MyCalendars;

});