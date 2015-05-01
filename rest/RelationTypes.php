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
	case 'GET':
		
		$response = $familyRelations -> getRelationTypes();
		
		//Hack, this url is used to verify sign on since there will always be data available.
		//It is also only requested once.  
		//Adding access level to response.
		$response['accessLevel'] = $access_level;
		
		break;
}

echo json_encode($response);

?>