define(function(){
	// Load FB SDK
 	window.fbAsyncInit = function(){
 		FB.init({
			appId      : '751003924936029',
			xfbml      : true,
			version    : 'v2.2',
			status     : true
 		}); 
 	};
	(function(d, s, id){
	 var js, fjs = d.getElementsByTagName(s)[0];
	 if (d.getElementById(id)) {return;}
	 js = d.createElement(s); js.id = id;
	 js.src = "js/vendor/fb_sdk.js";
	 fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));
});