define(['jquery', 'jquery-cookie', 'utils/UserUtils'], function($, cookie, UserAPI){
   	//If Facebook says we are already connected AND we have local storage items, let's try to login to the server.
    FB.getLoginStatus(function(response){
    	if(response.status === 'connected' && localStorage.getItem('fb_id') && $.cookie('access_token'))
    	{
    		UserAPI.loginToServer();
    	}
    	else
    		UserAPI.clearClient();
    })
	
});