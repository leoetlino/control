/*
 * ITFrame Login for Control
 * CC-BY Maarten Eyskens at Innovate Technologies
 * Want to use some of my code? Just ask! 
*/
var login=function(email,password){
	document.getElementById("login").disabled=true
	var checkdata=function(data){
		if (data.result=="success"){
			window.location.assign("./dash.html")
			Cookies.set('email',data.email)
			Cookies.set('key',data.key)
		}else{
			document.getElementById("wrongLogin").style.display="block";
			setTimeout(function(){document.getElementById("wrongLogin").style.display="none";}, 5000);
			document.getElementById("login").disabled=false
		} 
	}
	
	if(email.length === 0 || password.length === 0 ){
		document.getElementById("noLogin").style.display="block"
		setTimeout(function(){document.getElementById("noLogin").style.display="none";}, 5000)
		document.getElementById("login").disabled=false
	}else if(!Cookies.enabled){
		document.getElementById("noCookies").style.display="block"
		document.getElementById("login").disabled=false
	}else{
		$.getJSON(config.url+'/control/login/?email='+email+'&password='+password, checkdata);
	}
}

var loginCheck=function(){
	if (typeof Cookies.get("email")==="undefined" || typeof Cookies.get("key")==="undefined"){
		window.location.assign
	}
}