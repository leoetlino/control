/*
 * You're about to see the most modern control panel for SHOUTcast/Icecast
 * When you look close to all the existing systems all you see is outdated software
 * The most modern system I have seen was not even accesible to me but
 * With Control there comes an end to AJAX to be the most recent thing in radio
 *
 * It's time to do what is in our name
 * Innovate
 *
 * Maarten Eyskens
 * Co-Founder Innovate Technologies
*/


var control= angular.module('control',[])

control.controller('pageController',function(){
    this.page="Dashboard"
    
    this.setPage=function(page){
        this.page=page
    }
    
    this.isPage=function(page){
        return this.page == page
    }
    
    
})

control.controller('dashboardController',function(){
    this.user="World"
    
})

control.controller('aboutController',function(){
    this.user="World"
    
})
