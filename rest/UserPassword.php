<?php
require_once("../config/config.php");
include(ENV_PATH."RestIOC.php");
/*
	$familyEvents = new SqlEventFactory($familyDb);
	$familyNotes = new SqlNoteFactory($familyDb);
	$familyPeople = new SqlPersonFactory($familyDb);
	$familyRelations = new SqlRelationFactory($familyDb);
 
 	$authenticator = new SqlAuthenticator($familyDb);

	$username, $password
*/

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
		
		$response = $authenticator -> updateUserPassword($username, $password, $newPassword);

		break;
				
	default:
		
		$response = Array('error' => 'only accepts POST requests');
}

echo json_encode($response);

?>