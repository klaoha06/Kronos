define(['react', 'jquery', 'react-router','serverSetup', 'stores/CalendarStore' , 'actions/CalendarActions', 'utils/CalendarWebAPIUtils', 'magnific-popup'], function(React, $, Router, api, CalendarStore, CalendarActions, CalendarAPI, magnificPopup){
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
				<div>
					<UserCalsList data={this.state.cals}/>
					<CreateCal />
				</div>
			)
		}

	});

	var CreateCal = React.createClass({
		componentDidMount: function() {
			$('.popup-with-form').magnificPopup({
					type: 'inline',
					preloader: false,
					focus: '#name',

					// When elemened is focused, some mobile browsers in some cases zoom in
					// It looks not nice, so we disable it:
					// callbacks: {
					// 	beforeOpen: function() {
					// 		if($(window).width() < 700) {
					// 			this.st.focus = false;
					// 		} else {
					// 			this.st.focus = '#name';
					// 		}
					// 	}
					// }
				});
		},
		render: function() {
			return (
				<div>
				<button className="popup-with-form" href="#test-form">Create New Calendar</button>
				<form id="test-form" className="white-popup-block mfp-hide">
					<h1>Create Calendar Form</h1>
					<fieldset>
						<ol>
							<li>
								<label for="name">Name</label>
								<input id="name" name="name" type="text" placeholder="Name" required=""/>
							</li>
							<li>
								<label for="textarea">Textarea</label><br/>
								<textarea id="textarea">Try to resize me to see how popup CSS-based resizing works.</textarea>
							</li>
						</ol>
					</fieldset>
				</form>
				</div>
			);
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

			if (this.props.data.length < 1) {
				return (
					<h4>You have not create a calendar! Please Create one.</h4>
				)
			} else {			
				return (
					<div className="UserCals">
						{CalNodes}
					</div>
				)
			}
		}
	});

	var Calendar = React.createClass({
		handleClick: function(e){
			console.log(this.props.data.id)
			// Show all Events on the main calendar for this calendar id
		},
		render: function () {
			return (
				<p onClick={this.handleClick}>{this.props.data.name}</p>
			);
		}
	})

	return MyCalendars;

});