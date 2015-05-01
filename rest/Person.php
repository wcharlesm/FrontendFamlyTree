<?php
require_once("../config/config.php");
include(ENV_PATH."RestIOC.php");
/*
	$familyEvents = new SqlEventFactory($familyDb);
	$familyNotes = new SqlNoteFactory($familyDb);
	$familyPeople = new SqlPersonFactory($familyDb);
	$familyRelations = new SqlRelationFactory($familyDb);
*/
/*
  Person Interface
	public function getId(){
	public function getFirstName(){
	public function getMiddleName(){
	public function getLastName(){
	public function getSurname(){
	public function getCommonName(){
	public function getBirthday(){
	public function getDateOfDeath(){
*/

$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
	case 'POST':
		if ($delete && $personId){
			
			$familyPeople -> deletePerson($personId);
			
			$response = array($personId => 'deleted successfully?');
			
		} else {
			$personId = ($personId) ? $personId : -1;

			if ($firstName and $lastName){
				
				$person = new Person($firstName, $middleName, $lastName, $surname, $commonName, $gender, $birthDay, $birthMonth, $birthYear, $deathDay, $deathMonth, $deathYear, $identifier, $personId);				

				$response = $familyPeople -> insertPerson($person);

			} else {
				
				$response = array('posted'=>"Failure.  Missing variables in request.");

			}
		}
		break;

	case 'GET':

		$person = $familyPeople -> getPersonById($personId);

		$personArray = array();

		$personArray['id'] = $person -> getId(); 
		$personArray['identifier'] = $person -> getIdentifier(); 
		$personArray['firstName'] = $person -> getFirstName();
		$personArray['middleName'] = $person -> getMiddleName();
		$personArray['lastName'] = $person -> getLastName();
		$personArray['surname'] = $person -> getSurname();
		$personArray['commonName'] = $person -> getCommonName();
		$personArray['gender'] = $person -> getGender();
		$personArray['birthDay'] = $person -> getBirthDay();
		$personArray['birthMonth'] = $person -> getBirthMonth();
		$personArray['birthYear'] = $person -> getBirthYear();
		$personArray['deathDay'] = $person -> getDeathDay();
		$personArray['deathMonth'] = $person -> getDeathMonth();
		$personArray['deathYear'] = $person -> getDeathYear();

		$relations = $familyRelations -> getRelationsByPerson($personId);
		$relationsArray = array();

		foreach ($relations as $key => $relation) {
			$relationArray = array();

			$relationArray['id'] = $relation -> getId(); 
			$relationArray['myId'] = $relation -> getMyId();
			$relationArray['yourId'] = $relation -> getYourId();
			$relationArray['relationship'] = $relation -> getRelationship(); 
			$relationArray['startDay'] = $relation -> getStartDay();
			$relationArray['startMonth'] = $relation -> getStartMonth();
			$relationArray['startYear'] = $relation -> getStartYear();
			$relationArray['endDay'] = $relation -> getEndDay();
			$relationArray['endMonth'] = $relation -> getEndMonth();
			$relationArray['endYear'] = $relation -> getEndYear();
			$relationArray['note'] = $relation -> getNote(); 

			$relationsArray[$relation -> getId()] = $relationArray;
		}
		
		$events = $familyEvents -> getEventsByPerson($personId);
		$eventsArray = array();

		foreach ($events as $key => $event) {
			$eventArray  = array();

			$eventArray["id"] = $event -> getId();
			$eventArray["personId"] = $event -> getPersonId();
			$eventArray['startDay'] = $event -> getStartDay();
			$eventArray['startMonth'] = $event -> getStartMonth();
			$eventArray['startYear'] = $event -> getStartYear();
			$eventArray['endDay'] = $event -> getEndDay();
			$eventArray['endMonth'] = $event -> getEndMonth();
			$eventArray['endYear'] = $event -> getEndYear();
			$eventArray["description"] = $event -> getDescription();

			$eventsArray[$event -> getId()] = $eventArray; 
		}
		
		
		$notes = $familyNotes -> getNotesByPerson($personId);
		$notesArray = array();
			
		foreach ($notes as $key => $note) {
			$noteArray = array();
			
			$noteArray["id"] = $note -> getId();
			$noteArray["personId"] = $note -> getPersonId();
			$noteArray["note"] = $note -> getNote();

			$notesArray[$note -> getId()] = $noteArray; 
		}
		
		
		$response = array('person' => $personArray, 'relations' => $relationsArray, 'events' => $eventsArray, 'notes' => $notesArray);

		break;
}

echo json_encode($response);

?>