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
  	function __construct($personId, $note, $id=-1){
	public function getId(){
	public function getPersonId(){
	public function getNote(){
*/

$method = $_SERVER['REQUEST_METHOD'];

$response = array();

switch ($method){
	case 'POST':
		
		if($delete){
		
			if($noteId){
				$familyNotes -> deleteNote($noteId);
			}
			
		} else {
		
			$noteId = ($noteId) ? $noteId : -1;

			if ($personId and $note){
				
				$thisNote = new Note($personId, $note, $noteId);
				$familyNotes -> insertNote($thisNote);

				$response = array("Success!!!");

			} else {
				
				$response = array("Failure.  Missing variables in request.");

			}
			
		}
		
		break;

	case 'GET':

		$thisNote = $familyNotes -> getNoteById($noteId);

		$response = array();

		$response['id'] = $thisNote -> getId(); 
		$response['personId'] = $thisNote -> getPersonId();
		$response['note'] = $thisNote -> getNote();

		break;
}

echo json_encode($response);

?>