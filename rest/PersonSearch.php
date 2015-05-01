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
	case 'GET':
		
		if ($getAll) {
			$people = $familyPeople -> getAllPeopleDictionary();
		} else {
			$people = $familyPeople -> searchPeopleDictionary($firstName, $middleName, $lastName, $surname, $commonName, $birthDay, $birthMonth, $birthYear, $deathDay, $deathMonth, $deathYear);
		}
		
		$response = $people;
		 
		break;
	
	default:
		$response = Array('error' => 'This url only accepts GET requests');
}

echo json_encode($response);

?>

