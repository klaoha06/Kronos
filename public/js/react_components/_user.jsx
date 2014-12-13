define(['react'], function(React) {

	var UserPage = React.createClass({
		render: function() {
			return (
				<div>
					<div id="banner"></div>
					<h1>Hi, {localStorage.getItem('first_name') + " "+localStorage.getItem('last_name')[0] + "."}</h1>
					<img src={localStorage.getItem('profilePic')}/>
					<p>Email: {localStorage.getItem('email')}</p>
				</div>
			)
		}
	});

	return UserPage

});