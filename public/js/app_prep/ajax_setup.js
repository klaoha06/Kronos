define(['jquery'], function($){
  $.ajaxSetup({
      beforeSend: function(xhr) {
        // var fbStatus;
        // FB.getLoginStatus(function(res) {
        //   fbStatus = res.status;
        // });
        // if ($.cookie('access_token')) {
          xhr.setRequestHeader("access_token", $.cookie('access_token'));
          xhr.setRequestHeader("user_id", $.cookie('user_id'));
        // } else {
        //   console.log("can't send data before login or your session has timed out");
          // localStorage.clear();
          // document.location.href="/";
          // alert("can't send data before login or your session has timed out");
        // }
      }
  });   
});