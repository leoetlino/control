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

/* If the oauth_token is old redirect to the connect page. */
if (isset($_REQUEST['oauth_token']) && $_SESSION['oauth_token'] !== $_REQUEST['oauth_token']) {
    $_SESSION['oauth_status'] = 'oldtoken';
    session_destroy();
    header('Location: get-credentials.php');
    return;
}


$connection = new TwitterOAuth(CONSUMER_KEY, CONSUMER_SECRET, $_SESSION['oauth_token'], $_SESSION['oauth_token_secret']);
$accessToken = $connection->getAccessToken($_REQUEST['oauth_verifier']);

unset($_SESSION['oauth_token']);
unset($_SESSION['oauth_token_secret']);

?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Redirecting to Control...</title>
    </head>
    <body>
        <script>
            var data = <?php echo json_encode($accessToken); ?>;
            $scope = window.opener.$windowScope;
            $scope.settings.token = data.oauth_token;
            $scope.settings.secret = data.oauth_token_secret;
            $scope.settings.twitterHandle = data.screen_name;
            $scope.$apply();
            window.close();
        </script>
    </body>
</html>
