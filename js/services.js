(function(){
	
	var familyServices = angular.module('familyServices', ['familyConfiguration', 'familyAuthentication']);
	
	familyServices.factory('FamilyRest', ['FamilyConfig', 'FamilyAuth', function(config, auth) {
		function print(next){
			return function(data){
				console.log(JSON.stringify(data));
				next(data);
			};
		}
		
		function get(url, success, error){
			success = (success == null) ? function(){} : success;
			error = (error == null) ? function(){} : error; 
			
			auth.process({method: 'GET', url: config.baseRestUrl + url}, print(success), print(error));
		}
		
		function post(url, success, error){
			success = (success == null) ? function(){} : success;
			error = (error == null) ? function(){} : error; 
			
			auth.process({method: 'POST', url: config.baseRestUrl + url}, print(success), print(error));
		}
		
		return {
			'setUserCredentials': function(username, password){
				auth.setCredentials(username, password);
			},
			
			'getPerson': function (personId, success, error) {
				var url = "Person.php?personId=" + personId;
				get(url, success, error);
			},
			
			'getAllPeople': function(success, error){
				var url = "PersonSearch.php?getAll=true";
				get(url, success, error);
			},
			
			'searchPeople': function (personCriteria) {
				
				return 'searchPeople';
				
			},
			
			'postPerson': function (person, success, error) {
				//if ($firstName and $middleName and $lastName and $surname and $commonName and $birthday and $dateOfDeath)
				
				if ( !(person && person.firstName && person.lastName && person.gender) ) {
					
					console.log('Could not create / update person due to missing parameters');
					return 'Could not create / update person due to missing parameters';		
				} 
				
				var postUrl = 'Person.php?';
				
				postUrl += 'firstName=' + encodeURIComponent(person.firstName);
				postUrl += '&lastName=' + encodeURIComponent(person.lastName);
				postUrl += '&gender=' + encodeURIComponent(person.gender);
				
				if ( person.middleName ) postUrl += '&middleName=' + encodeURIComponent(person.middleName);
				if ( person.surname ) postUrl += '&surname=' + encodeURIComponent(person.surname);	
				if ( person.commonName ) postUrl += '&commonName=' + encodeURIComponent(person.commonName);
				if ( person.birthDay ) postUrl += '&birthDay=' + encodeURIComponent(person.birthDay);
				if ( person.birthMonth ) postUrl += '&birthMonth=' + encodeURIComponent(person.birthMonth);
				if ( person.birthYear ) postUrl += '&birthYear=' + encodeURIComponent(person.birthYear);
				if ( person.deathDay ) postUrl += '&deathDay=' + encodeURIComponent(person.deathDay);
				if ( person.deathMonth ) postUrl += '&deathMonth=' + encodeURIComponent(person.deathMonth);
				if ( person.deathYear ) postUrl += '&deathYear=' + encodeURIComponent(person.deathYear);
				if ( person.identifier ) postUrl += '&identifier=' + encodeURIComponent(person.identifier);
				if ( person.id ) postUrl += '&personId=' + encodeURIComponent(person.id);

				post(postUrl, success, error);
				
				return 'person posted';
				
			},
			
			'deletePerson': function (personId, success, error){
				if (personId == null) return "no personId provided";
				
				var url = 'Person.php?delete=true&personId=' + personId;
				
				post(url, success, error);
			},
			
			'getEvent': function (evtId, success, error) {
				var url = "Event.php?eventId=" + evtId;
				get(url, success, error);
				
				return 'getEvent';
				
			},
			
			'getEvents': function (personId, success, error) {
				var url = "Events.php?personId=" + personId;
				get(url, success, error);
				
				return 'getEvents';
				
			},
			
			'postEvent': function (evt, success, error) {
				//if ($personId and $startDate and $endDate and $description)
				var url = 'Event.php?';
				
				if ( !(evt && evt.personId && evt.description) ){
					console.log("Could not create / update event.  Missing parameters");
					return "Could not create / update event.  Missing parameters";
				}
				
				url += 'personId=' + encodeURIComponent(evt.personId);
				url += '&description=' + encodeURIComponent(evt.description);
				
				if ( evt.startDay ) url += '&startDay=' + encodeURIComponent(evt.startDay);
				if ( evt.startMonth ) url += '&startMonth=' + encodeURIComponent(evt.startMonth);
				if ( evt.startYear ) url += '&startYear=' + encodeURIComponent(evt.startYear);
				if ( evt.endDay ) url += '&endDay=' + encodeURIComponent(evt.endDay);
				if ( evt.endMonth ) url += '&endMonth=' + encodeURIComponent(evt.endMonth);
				if ( evt.endYear ) url += '&endYear=' + encodeURIComponent(evt.endYear);
				if ( evt.id ) url += '&eventId=' + encodeURIComponent(evt.id);
				
				post(url, success, error);
				
				return 'postEvent';
				
			},
			
			'deleteEvent': function(eventId, success, error){
				if (eventId == null) return "no event id provided";
				
				var url = 'Event.php?delete=true&eventId=' + eventId;
				
				post(url, success, error);
			},
			
			'getNote': function (noteId, success, error) {
				var url = 'Note.php?noteId=' + noteId;
				get(url, success, error);
					
				return 'getNote';
			},
			
			'getNotes': function (personId, success, error) {
				var url = 'Notes.php?personId=' + personId;
				
				get(url, success, error);
				
				return 'getNotes';
			},
			
			'postNote': function (note, success, error) {
				//if ($personId and $note)
				if ( !(note && note.personId && note.note) ){
					console.log("Could not create / update note.  Missing parameters");
					return "Could not create / update note.  Missing parameters";
				}
				
				var url = 'Note.php?';
				
				url += 'personId=' + encodeURIComponent(note.personId);
				url += '&note=' + encodeURIComponent(note.note);
				
				if (note.id) url += '&noteId=' + encodeURIComponent(note.id);
				
				post(url, success, error);
				
				return 'postNote';
			},
			
			'deleteNote': function(noteId, success, error){
				if (noteId == null) return "no note id provided";
				
				var url = 'Note.php?delete=true&noteId=' + noteId;
				
				post(url, success, error);
			},
			
			'getRelation': function (relId, success, error) {
				var url = "Relation.php?relationId=" + relId;
				get(url, success, error);
				
				return 'getRelation';
				
			},
			
			'getRelations': function (personId, success, error) {
				var url = "Relations.php?personId=" + personId;
				get(url, success, error);

				return 'getRelations';	
			},
			
			'postRelation': function (rel, success, error) {
				//if ( $myId and $yourId and $relationship and $startDate and $endDate and $note)
				
				if ( !(rel && rel.myId && rel.yourId && rel.relationship) ) {
					
					console.log('Could not create / update relationship due to missing parameters');
					return 'Could not create / update person due to missing parameters';		
				} 
				
				var url = 'Relation.php?';
				
				url += 'myId=' + encodeURIComponent(rel.myId);
				url += '&yourId=' + encodeURIComponent(rel.yourId);
				url += '&relationship=' + encodeURIComponent(rel.relationship);
				
				if ( rel.id ) url += '&relationId=' + encodeURIComponent(rel.id);
				if ( rel.startDay ) url += '&startDay=' + encodeURIComponent(rel.startDay);
				if ( rel.startMonth ) url += '&startMonth=' + encodeURIComponent(rel.startMonth);
				if ( rel.startYear ) url += '&startYear=' + encodeURIComponent(rel.startYear);
				if ( rel.endDay ) url += '&endDay=' + encodeURIComponent(rel.endDay);
				if ( rel.endMonth ) url += '&endMonth=' + encodeURIComponent(rel.endMonth);
				if ( rel.endYear ) url += '&endYear=' + encodeURIComponent(rel.endYear);
				if ( rel.note ) url += '&note=' + encodeURIComponent(rel.note);
				
				post(url, success, error);
				
				return 'postRelation';
				
			},
			
			'deleteRelation': function (relationId, success, error){
				if (relationId == null) return "no relation id provided";
				
				var url = 'Relation.php?delete=true&relationId=' + encodeURIComponent(relationId);
				
				post(url, success, error);
			},
			
			'getRelationTypes': function (success, failure) {
				var url = 'RelationTypes.php';
				get(url, success, failure);
				
				return 'getRelationTypes';
			},
			
			'updatePassword': function (newPw, success, failure){
				if (newPw == null) return "no new password provided";
				
				var url = 'UserPassword.php?newPassword=' + encodeURIComponent(newPw);
				
				post(url, success, failure);
			}
			
		};
	}]);	
})();


