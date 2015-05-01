<?php
require_once("../config/config.php");
include(ENV_PATH."RestIOC.php");
/*
	$familyNotes = new SqlNoteFactory($familyDb);
	$familyNotes = new SqlNoteFactory($familyDb);
	$familyPeople = new SqlPersonFactory($familyDb);
	$familyRelations = new SqlRelationFactory($familyDb);
*/
/*
  	function __construct($myId, $yourId, $relationship, $startDate, $endDate, $note, $id=-1){
	public function getId(){							
	public function getMyId(){
	public function getYourId(){
	public function getRelationship(){
	public function getStartDate(){
	public function getEndDate(){
	public function getNote(){
*/

$method = $_SERVER['REQUEST_METHOD'];

switch ($method){
	case 'POST':
		
		if($delete){
			
			if ($relationId){
				$response = $familyRelations -> deleteRelation($relationId);
			}
			
		} else {
		
			$relationId = ($relationId) ? $relationId : -1;
	
			$response = array();
	
			if ( $myId and $yourId and $relationship ){
				
				$relation = new Relation($myId, $yourId, $relationship, $startDay, $startMonth, $startYear, $endDay, $endMonth, $endYear, $note, $relationId);
				$response = $familyRelations -> insertRelation($relation);
	
			} else {
				
				$response = array("Failure.  Missing variables in request.");
	
			}
		}
		
		break;

	case 'GET':

		$relation = $familyRelations -> getRelationById($relationId);

		$response = array();

		$response['id'] = $relation -> getId(); 
		$response['myId'] = $relation -> getMyId();
		$response['yourId'] = $relation -> getYourId();
		$response['relationship'] = $relation -> getRelationship(); 
		$response['startDay'] = $relation -> getStartDay();
		$response['startMonth'] = $relation -> getStartMonth();
		$response['startYear'] = $relation -> getStartYear();
		$response['endDay'] = $relation -> getEndDay();
		$response['endMonth'] = $relation -> getEndMonth();
		$response['endYear'] = $relation -> getEndYear();
		$response['note'] = $relation -> getNote(); 

		break;
}

echo json_encode($response);

?>