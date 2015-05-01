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
  	__construct($personId, $startDate, $endDate, $description, $id=-1){	
	public function getId(){
	public function getPersonId(){
	public function getStartDate(){
	public function getEndDate(){
	public function getDescription(){
*/

$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
	case 'POST':
		
		if($delete){
			
			if ($eventId) {
				$familyEvents -> deleteEvent($eventId);
			}
			
		} else {
		
			$eventId = ($eventId) ? $eventId : -1;
			
			if ($personId and $description){
				
				if ($endDate == null) $endDate = $startDate;
				
				$event = new Event($personId, $startDay, $startMonth, $startYear, $endDay, $endMonth, $endYear, $description, $eventId);
				
				//Troubleshooting this function call
				$familyEvents -> insertEvent($event);
			
				$response = array("Success!!!");
				
			} else {
				
				$response = array("Failure.  Missing variables in request.");
				
			} 
		}
		
		break;
		
	case 'GET':

		if ($eventId){
			$event = $familyEvents -> getEventById($eventId);
			
			$response = array();
			
			$response['id'] = $event -> getId(); 
			$response['personId'] = $event -> getPersonId();
			$response['startDay'] = $event -> getStartDay();
			$response['startMonth'] = $event -> getStartMonth();
			$response['startYear'] = $event -> getStartYear();
			$response['endDay'] = $event -> getEndDay();
			$response['endMonth'] = $event -> getEndMonth();
			$response['endYear'] = $event -> getEndYear();
			$response['description'] = $event -> getDescription();
			
		} else {
			$response = array('error' => 'eventId required');
		}
		
		break;
}

echo json_encode($response);

?>