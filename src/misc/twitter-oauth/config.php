<?php
/*
 * Get Twitter credentials and send them back to the client
 *
 * This is the configuration file which contains secrets.
 *
 * THIS FILE IS TO BE KEPT ABSOLUTELY CONFIDENTIAL.
 *
 * Any leak will result in sanctions, including but not limited to
 * staff termination.
 *
 * @author    Léo Lam
 * @date      07/08/2014
 * @copyright Innovate Technologies, 2014.
 */

$protocol = ($_SERVER['HTTP_HOST'] === 'control.shoutca.st') ? 'https' : 'http';

define('CONSUMER_KEY', 'pleLmTOiQ5E1JFambg5FBNeSN');
define('CONSUMER_SECRET', 'MGLQKpJy0EpbJdxv39N8HyuQ0eSrqrf8AxYfgY54IJGwXXowI9');
define('OAUTH_CALLBACK', $protocol . '://' . $_SERVER['HTTP_HOST'] . '/misc/twitter-oauth/callback.php');
