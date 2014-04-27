<?php 
defined("RADIOcast") or die;
?>
<!DOCTYPE html>
<html class="RADIOcast" lang="en">
    <head>
        <meta charset="utf-8">
        <title>RADIOcast ALPHA</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="">
        <link rel="canonical" href="http://www.shoutca.st">
		<link rel="icon" href="favicon.ico">
        <meta name="keywords" content="shoutcast servers, cheap shoutcast, shoutcast, start an internet radio station, start a radio station, online radio, radio, shout, cast">
        <link data-noprefix href="//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.2/css/bootstrap.min.css" rel="stylesheet">
        <link data-noprefix href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/4.0.1/css/font-awesome.min.css" rel="stylesheet">
        <link data-noprefix href="//fonts.googleapis.com/css?family=Montserrat:400,700|Lato:400" rel="stylesheet">
        <link rel="stylesheet" data-noprefix href="./class/theme/css/flexslider.css">
        <link rel="stylesheet" href="./class/theme/css/main.css">

    </head>
    <body data-spy="scroll" data-target="#topbar" onload="loadPage('home')">
        <a id="home"></a>
        <!-- Start of header -->
        <nav class="navbar navbar-inverse navbar-fixed-top" id="topbar" role="navigation">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                        <span class="sr-only">Toggle</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand"  onclick="loadPage('home')">RADIOca.st</a>
                </div>
                <div class="collapse navbar-collapse navbar-collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li class="home-link"><a  class="top-link"  title="Home" onclick="loadPage('home')">Home</a></li>
                        <li class="genres-link"><a  class="top-link"  title="Genres" onclick="loadPage('list')">Genres</a></li>
                        <li class="popular-link"><a  class="top-link"  title="Popular" onclick="loadPage('list')">Popular</a></li>
                        <li class="new-link"><a class="top-link"  title="New" onclick="loadPage('list')">New</a></li>
                        <li class="add-station-button"><a  role="button" class="btn btn-success">Add Your Station</a></li>
                    </ul>     
                </div>
            </div>
        </nav>
        <!-- End of header -->
        <noscript>
            <div class="alert alert-danger" style="margin-top: 2em;">
                <p><i class="icon-warning-sign"></i> <b>Please enable Javascript in your browser.</b></p>
            </div>
        </noscript>
        <div class="container" id="page">
