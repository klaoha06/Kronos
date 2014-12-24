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
	  handleSubmit: function(e) {
	  	e.preventDefault();
	  	// getting values from form
	  	var title = this.refs.title.getDOMNode().value.trim();
	  	var description = this.refs.description.getDOMNode().value.trim();
	  	var startDate = this.refs.startDate.getDOMNode().value.trim();
	  	var endDate = this.refs.endDate.getDOMNode().value.trim();
	  	var location = this.refs.location.getDOMNode().value.trim();
	  	var url = this.refs.externalUri.getDOMNode().value.trim();
	  	var share = this.refs.share.getDOMNode().value.trim();
	  	// validation
	  	if (!title || !startDate || !share) {
	  	  return;
	  	} else {
	  		// Send data to server
	  	}
	  },

	  // var CommentForm = React.createClass({
	  //   handleSubmit: function(e) {
	  //     e.preventDefault();
	  //     var author = this.refs.author.getDOMNode().value.trim();
	  //     var text = this.refs.text.getDOMNode().value.trim();
	  //     if (!text || !author) {
	  //       return;
	  //     }
	  //     this.props.onCommentSubmit({author: author, text: text});
	  //     this.refs.author.getDOMNode().value = '';
	  //     this.refs.text.getDOMNode().value = '';
	  //     return;
	  //   },
	  //   render: function() {
	  //     return (
	  //       <form className="commentForm" onSubmit={this.handleSubmit}>
	  //         <input type="text" placeholder="Your name" ref="author" />
	  //         <input type="text" placeholder="Say something..." ref="text" />
	  //         <input type="submit" value="Post" />
	  //       </form>
	  //     );
	  //   }
	  // });

	  render: function() {

	    return (
	    	<div>
	    		<h1>Create Your New Event!</h1>
		    	<form onSubmit={this.handleSubmit} className="eventForm">
		    		Event Name:<br/>
		    		<input type="text" ref="title"/>
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
			      	End Date: <input type="text" ref="endDate" className="datepicker"/>
			      </p>
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
			          <option defaultValue="selected">Yes!</option>
			          <option>No</option>
			        </select>
			       </fieldset>

			      <input type="submit" value="Create Event"/>
		    		
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