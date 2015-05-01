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
			$events = $familyEvents -> getEventsByPerson($personId);
			
			$response = array();
			
			foreach ($events as $key => $event) {
				$current = array();
				
				$current["id"] = $event -> getId();
				$current["personId"] = $event -> getPersonId();
				$current['startDay'] = $event -> getStartDay();
				$current['startMonth'] = $event -> getStartMonth();
				$current['startYear'] = $event -> getStartYear();
				$current['endDay'] = $event -> getEndDay();
				$current['endMonth'] = $event -> getEndMonth();
				$current['endYear'] = $event -> getEndYear();
				$current["description"] = $event -> getDescription();

				$response[$event -> getId()] = $current; 
			}

		}

		break;
}

echo json_encode($response);

?>