define(['react', 'serverSetup', 'jsx!react_components/user/_profile'], function(React, api, UserProfile) {

	var UserPage = React.createClass({
		getInitialState: function(){
			return {data: []};
		},

		loadDataFromServer: function() {
			var that = this;
			var url = window.location.href;
			var userId = url.substring(url.lastIndexOf('/') + 1);
			$.ajax({
				url: api + '/users/' + userId,
				dataType: 'json',
			}).done(function(data){
				that.setState({data: data});
				console.log(that.state);
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});
		},

		componentDidMount: function () {
			this.loadDataFromServer();
		},

		render: function() {
				return (
					<div>
					<h1>{this.state.data.name}</h1>
					<img src={this.state.data.profile_pic}/>
					<Subscribe />
					</div>
				)
		}
	});

	var Subscribe = React.createClass({
		render: function () {
			return (
				<button>FOLLOW</button>
			)
		}
	});

	return UserPage

});

