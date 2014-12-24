define(['react', 'jquery', 'react-router', 'serverSetup', 'actions/EventViewActions', 'moment', 'jqueryUI'], function(React, $, Router, api, EventViewActions, moment, jqueryUI){
	var ENTER_KEY_CODE = 13;

	var EventCreator = React.createClass({

	  getInitialState: function() {
	    return {text: ''};
	  },
	  componentDidMount: function() {
	  	$(function() {
	  		var currentDate = new Date();
	  	  $( ".datepicker" ).datepicker();
	  	});
	  },
	  createEvent: function() {
	  	alert('hi');
	  },

	  render: function() {

	    return (

	    	<div>
	    		<h1>Create Your New Event!</h1>
		    	<form onSubmit={this.createEvent}>
		    		Event Name:<br/>
		    		<input type="text" name="title"/>
		    		<br/><br/>
		    		Description:<br/>
			      <textarea
			        name="description"
			      />
			      <br/><br/>
			      <p>
			      	Start Date: <input type="text" name="startDate" className="datepicker"/>
			      </p>
			      <p>
			      	End Date: <input type="text" name="endDate" className="datepicker"/>
			      </p>
			      <p>
			      	Location: <input type="text" name="location"/>
			      </p>
			      <p>
			      	Url: <input type="text" name="externalUri"/>
			      </p>
			      <p>
			      	Upload Pictures for This Event: <input type="file" />
			      </p>
			      <fieldset>
			        <label for="speed">Share this event?</label>
			        <select name="speed" id="speed">
			          <option defaultValue="selected">Yes!</option>
			          <option>No</option>
			        </select>
			       </fieldset>

			      <input type="submit" value="Submit"/>
		    		
		    	</form>

	      </div>
	    );

	  },

	  _onChange: function(event, value) {
	    this.setState({text: event.target.value});
	  },

	  _onKeyDown: function(event) {
	    if (event.keyCode === ENTER_KEY_CODE) {
	      event.preventDefault();
	      var text = this.state.text.trim();
	      if (text) {
	        ChatMessageActionCreators.createMessage(text);
	      }
	      this.setState({text: ''});
	    }
	  }

	});

	return EventCreator

});