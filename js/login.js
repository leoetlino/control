var login=function(email,password){
	var checkdata=function(data){
		if (data.result=="success")window.location.assign("./dash.html");
		else{
			document.getElementById("wrongLogin").style.display="block";
			setTimeout(function(){document.getElementById("wrongLogin").style.display="none";}, 5000);
		} 
	}
	$.getJSON(
    	'http://192.168.1.226:8080/control/login/?email='+email+'&password='+password, 
		checkdata
	);

}

var checkLoggedIn=function(){
	$.getJSON(
    	'http://192.168.1.226:8080/control/check/', 
		checkdata
	);

}
var checkdata=function(data){
	if (data.result!="OK") window.location.assign("./login.html?wrongLogin");
}