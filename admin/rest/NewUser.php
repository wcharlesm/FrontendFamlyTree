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
		
		if ($newUserName and $newUserPassword){
			
			$authenticator -> addUser($newUserName, $newUserPassword, $username, $password);

			$response = array('success' => 'user created');

		} else {
			
			$response = array('posted'=>"Failure.  Missing variables in request.");

		}
		
		break;

	case 'GET':

		$response = array('error' => 'GET requests not supported');

		break;
}


header('Content-type: application/json');

echo json_encode($response);
?>