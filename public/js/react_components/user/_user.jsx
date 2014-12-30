define(['react', 'serverSetup'], function(React, api) {

	var UserPage = React.createClass({
		getInitialState: function(){
			return {data: []};
		},

		loadDataFromServer: function(userId) {
			var that = this;
			$.ajax({
				url: api + '/users/' + userId,
				dataType: 'json',
			}).done(function(data){
				that.setState({data: data});
			}).fail(function(data){
				console.log("FAILED REQUEST");
			});
		},

		componentDidMount: function () {
			this.loadDataFromServer(this.props.userId);
		},

		render: function() {
				return (
					<div>
					<h1>{this.state.data.name}</h1>
					<img src={this.state.data.profile_pic}/>
					<SubscribeToUser />
					</div>
				)
		}
	});

	var SubscribeToUser = React.createClass({
		render: function () {
			return (
				<button>FOLLOW</button>
			)
		}
	});

	return UserPage

});

