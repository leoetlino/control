/*
    RADIOcast Javascript
*/
function loadPage(page) 
{
    var loading='<div class="text-center"><h2>Loading...</h2></div>';
    $('#page').html(loading);
    if (page=='home' && window.location.hash.length !== 0) page=window.location.hash.replace('#',"");
    if(page!=window.location){
      window.history.pushState({path:page},'',page);
    }
    /*$.get("./"+page+".php", function(data) {
    $('#page').html(data);
    
  });*/
}