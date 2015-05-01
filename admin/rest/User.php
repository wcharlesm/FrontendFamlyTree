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

/*
interface UserFactory {
	function addUser($name, $password, $access);
	function getUsers();
	function updateUser($id, $name, $access);
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
		
		if($get == "all"){
			
			$users = $familyUsers -> getUsers();
			
			$response = array("-1" => "make sure there is data");
			
			foreach (users as $key => $user) {
				//$current = array();
				
				//$current["id"] = $user -> getId();
				//$current["userName"] = $user -> getName();
				//$current["access"] = $user -> getAccess();
	
				//$response[$user -> getId()] = $current; 
			}
			
		} else {
			
			$response = array('error' => 'Request not supported');
			
		}
		

		

		break;
}


header('Content-type: application/json');

echo json_encode($response);
?>