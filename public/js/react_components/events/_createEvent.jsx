define(['react', 'jquery', 'jquery-ui-custom', 'react-router', 'serverSetup', 'moment', 'utils/EventWebAPIUtils', 'magnific-popup', 'picker', 'pickadate', 'pickatime', 'pickalegacy', 'stores/CalendarStore', 'actions/CalendarActions'], function(React, $, jqueryUI, Router, api, moment, EventAPI, magnificPopup, picker, Pickadate, Pickatime, Pickalegacy, CalendarStore, CalendarActions){
	var EventCreator = React.createClass({

	  getInitialState: function() {
	    return {event: {}, cals: []};
	  },
	  componentDidMount: function() {
	  	CalendarStore.addChangeListener(this._onChange);
	  	$('.createEventForm').magnificPopup({
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
	  	$(function() {
	  	  $( ".datepicker" ).pickadate({
				    editable: true
					});
	  	  $( ".timepicker" ).pickatime({
	  	  	editable: true
	  	  });
	  	});
	  },
	  componentWillUnmount: function() {
	    CalendarStore.removeChangeListener(this._onChange);
	  },
	  _onChange: function() {
	    this.setState({cals: CalendarStore.getUserCals()});
	  },
	  handleSubmit: function(e) {
	  	e.preventDefault();
	  	// Getting values from form
	  	var name = this.refs.name.getDOMNode().value.trim();
	  	var description = this.refs.description.getDOMNode().value.trim();
	  	var startDate = this.refs.startDate.getDOMNode().value.trim();
	  	var startTime = this.refs.startTime.getDOMNode().value.trim();
	  	var endDate = this.refs.endDate.getDOMNode().value.trim();
	  	var endTime = this.refs.endTime.getDOMNode().value.trim();
	  	var location = this.refs.location.getDOMNode().value.trim();
	  	var url = this.refs.externalUri.getDOMNode().value.trim();
	  	var share = this.refs.share.getDOMNode().value.trim();
			var cal_id = this.refs.cal.getDOMNode().value.trim();
	  	// Validation
	  	if (!name || !startDate || !share) {
	  		alert('please input at least a tile and a start time')
	  	  return;
	  	} else {
	  		var data = {event:{
	  			title: name,
	  			description: description,
	  			start: startDate + " " + startTime,
	  			end: endDate + " " + endTime,
	  			location: location,
	  			external_uri: url,
	  			share: share
	  		}, calendar_id: cal_id};
	  		// Optimistically Update the View
	  		CalendarActions.addEventToCal(data);
	  		// Send data to server
	  		EventAPI.createEvent(data);
	  		$.magnificPopup.close();
	  		return;
	  	}
	  },
	  render: function() {
	  	if (typeof this.state.cals !== 'undefined') {
	  		var CalSelections = $.map(this.state.cals, function(data){
	  				return (
	  					<option value={data.cal.id}>{data.cal.name}</option>
	  				)
	  		});
	  	}
	    return (
	    	<div>
	    		<a className="createEventForm" href="#event-form" onClick={this._onChange}><button>Create New Event</button></a>
		    	<form id="event-form" className="mfp-hide white-popup-block" onSubmit={this.handleSubmit}>
	    		<h1>Create Your New Event!</h1>
		    		Event Name:<br/>
		    		<input type="text" ref="name"/>
		    		<br/><br/>
		    		Description:<br/>
			      <textarea
			        ref="description"
			      />
			      <br/><br/>
			      <p>
			      	Start Date: <input type="text" ref="startDate" className="datepicker"/>
			      </p>  
			      <p>
			      	Start Time: <input type="text" ref="startTime" className="timepicker"/>
			      </p>
			      <p>
			      	End Date: <input type="text" ref="endDate" className="datepicker"/>
			      </p>
			      <p>
			      	End Time: <input type="text" ref="endTime" className="timepicker"/>
			      </p>
			      <p>
			      	Have to do Time Zone Picker
			      </p>
			      <fieldset>
			      	<label for="cal">Add to Calendar</label>
			      	<select ref="cal" id="cal">
			      		{CalSelections}
			      	</select>
			      </fieldset>
			      <p>
			      	Location: <input type="text" ref="location"/>
			      </p>
			      <p>
			      	Extenal Link: <input type="text" ref="externalUri"/>
			      </p>
			      <p>
			      	Upload Pictures for This Event: <input type="file" />
			      </p>
			      <fieldset>
			        <label for="share">Share this event?</label>
			        <select ref="share" id="share">
			          <option value="true">Yes!</option>
			          <option value="false">No</option>
			        </select>
			       </fieldset>

			      <input type="submit" value="Create Event"/>
		    		
		    	</form>

	      </div>
	    );

	  }

	});

	return EventCreator

});