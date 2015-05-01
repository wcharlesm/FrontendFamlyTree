<?php
require_once("../../config/config.php");
include(ENV_PATH."RestIOC.php");

/*
interface Authenticator {
	function authenticate($un, $pw);
	function addUser($newUn, $newPw, $adminUn, $adminPw);
	function updateUserPassword($un, $oldPw, $newPw);
}
*/
$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
	case 'POST':

		$response = array('error' => 'POST requests not supported', 'access' => 'none');
		
		break;

	case 'GET':

		$response = $authenticator -> authenticate($username, $password);

		break;
}


header('Content-type: application/json');

echo json_encode($response);

?>
