<?php
require_once("../config/config.php");
include(ENV_PATH."RestIOC.php");
/*
	$familyEvents = new SqlEventFactory($familyDb);
	$familyNotes = new SqlNoteFactory($familyDb);
	$familyPeople = new SqlPersonFactory($familyDb);
	$familyRelations = new SqlRelationFactory($familyDb);
*/

$method = $_SERVER['REQUEST_METHOD'];


switch ($method){
	case 'GET':
		
		if ($personId != null) {
			$response = array();
			
			$notes = $familyNotes -> getNotesByPerson($personId);
			
			foreach ($notes as $key => $note) {
				$current = array();
				
				$current["id"] = $note -> getId();
				$current["personId"] = $note -> getPersonId();
				$current["note"] = $note -> getNote();

				$response[$note -> getId()] = $current; 
			}
		}

		break;
}

echo json_encode($response);

?>