<?php
/*
 * Get Twitter credentials and send them back to the client
 *
 * @author    Léo Lam
 * @date      07/08/2014
 * @copyright Innovate Technologies, 2014.
 */

session_start();
require_once 'config.php';
require_once 'libs/twitteroauth.php';

$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET);
$requestToken = $connection->getRequestToken(OAUTH_CALLBACK);

$_SESSION['oauth_token'] = $token = $requestToken['oauth_token'];
$_SESSION['oauth_token_secret'] = $requestToken['oauth_token_secret'];

if ($connection->http_code !== 200) {
    echo 'Something went terribly wrong while getting your Twitter credentials. Please inform us as soon as possible.';
    return;
}

header('Location: ' . $connection->getAuthorizeURL($token));
