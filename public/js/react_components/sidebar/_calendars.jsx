define(['react', 'jquery', 'jquery-ui-custom', 'react-router','serverSetup', 'stores/CalendarStore' , 'actions/CalendarActions', 'utils/CalendarWebAPIUtils', 'magnific-popup'], function(React, $, jqueryUI, Router, api, CalendarStore, CalendarActions, CalendarAPI, magnificPopup){
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
		handleCalSubmit: function(newCal){
			debugger;
			this.state.cals.push({cal: newCal, events: {}});
			this.setState({cals: this.state.cals}, function() {
			  CalendarAPI.createCal(newCal);
			});
		},
		render: function() {
			return (
				<div>
					<UserCalsList data={this.state.cals}/>
					<CreateCal onCalSubmit={this.handleCalSubmit}/>
				</div>
			)
		}

	});

	var CreateCal = React.createClass({
		componentDidMount: function() {
			$('.createCalForm').magnificPopup({
					type: 'inline',
					preloader: false,
					focus: '#name',
					callbacks: {
						beforeOpen: function() {
							if($(window).width() < 700) {
								this.st.focus = false;
							} else {
								this.st.focus = '#name';
							}
						}
					}
				});
		},
		handleSubmit: function(e) {
			e.preventDefault();
			var name = this.refs.title.getDOMNode().value.trim();
			var share = (this.refs.share.getDOMNode().value.trim() === 'true');
			var user_id = $.cookie('user_id');
			var currentTime = new Date();

			if (!name || !share) {
			  return;
			}
			this.props.onCalSubmit({name: name, share: share, creator_id: user_id});
			this.refs.title.getDOMNode().value = '';
			this.refs.share.getDOMNode().value = 'true';
			$.magnificPopup.close();
			return;
			// Optimistically update Store first then send data back the server
		},
		render: function() {
			return (
				<div>
				<a className="createCalForm" href="#cal-form"><button>Create New Calendar</button></a>
				<form id="cal-form" className="mfp-hide white-popup-block" onSubmit={this.handleSubmit}>
					<h1>Create New Calendar</h1>
					<fieldset>
						<ul>
							<li>
								<label for="name">Name </label>
								<input id="name" ref="title" type="text" placeholder="Name" required=""/>
							</li><br/>
							<li>
								<input type="checkbox" ref="share" value="true" defaultChecked> Share? </input>
								<br/>
							</li><br/>
						</ul>
					</fieldset>
					<input type="submit" value="Create Calendar"/>
				</form>
				</div>
			);
		}
	});

	var UserCalsList = React.createClass({
		render: function () {
			console.log(this.props.data)
			var CalNodes = this.props.data.map(function(calendar, index) {
				return (
					<div className="row">
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
		componentDidMount: function() {
			$('#external-events .fc-event').each(function() {

				// store data so the calendar knows to render an event upon drop
				$(this).data('event', {
					title: $.trim($(this).text()), // use the element's text as the event title
					stick: true // maintain when user navigates (see docs on the renderEvent method)
				});

				// make the event draggable using jQuery UI
				$(this).draggable({
					zIndex: 999,
					revert: true,      // will cause the event to go back to its
					revertDuration: 0  //  original position after the drag
				});

			});
		},
		handleClick: function(e){
			$(e.target).closest("div").find("#external-events").slideToggle();
			// Show all Events on the main calendar for this calendar id
			window.location = '/#/users/calendar';
			CalendarActions.updateCurrentCal(this.props.data.cal.id);
		},
		render: function () {
			return (
				<div className="debug" onClick={this.handleClick}>
					<h5>{this.props.data.cal.name}</h5>
					<div id='external-events' className="hide">
						<h4>Draggable Events</h4>
						<div className='fc-event'>My Event 1</div>
						<div className='fc-event'>My Event 2</div>
						<div className='fc-event'>My Event 3</div>
						<div className='fc-event'>My Event 4</div>
						<div className='fc-event'>My Event 5</div>
						<p>
							<input type='checkbox' id='drop-remove' />
							<label for='drop-remove'>remove after drop</label>
						</p>
					</div>
				</div>
			);
		}
	})

	return MyCalendars;

});