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
			$relations = $familyRelations -> getRelationsByPerson($personId);

			$response = array();

			foreach ($relations as $key => $relation) {
				$current = array();

				$current["id"] = $relation -> getId();
				$current["myId"] = $relation -> getMyId();
				$current["yourId"] = $relation -> getYourId();
				$current["relationship"] = $relation -> getRelationship();
				$current['startDay'] = $relation -> getStartDay();
				$current['startMonth'] = $relation -> getStartMonth();
				$current['startYear'] = $relation -> getStartYear();
				$current['endDay'] = $relation -> getEndDay();
				$current['endMonth'] = $relation -> getEndMonth();
				$current['endYear'] = $relation -> getEndYear();
				$current["note"] = $relation -> getNote();

				$response[$relation -> getId()] = $current; 
			}
		}

		break;
}

echo json_encode($response);

?>