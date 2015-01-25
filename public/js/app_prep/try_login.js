define(['jquery', 'jquery-cookie', 'utils/UserUtils'], function($, cookie, UserAPI){
    FB.getLoginStatus(function(response){
    	if(response.status === 'connected' &&localStorage.getItem('fb_id') && $.cookie('access_token'))
    	{
    		UserAPI.loginToServer();
    	}
    })
	
});