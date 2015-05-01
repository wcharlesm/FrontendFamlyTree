(function(){
	
	var familyControllers = angular.module('familyControllers', ['familyServices']);
	
	familyControllers.controller('PeopleCtrl', ['$scope', 'FamilyRest', function(scope, rest){
		scope.user = {};
		
		scope.people = {};
		scope.relations = {};
		scope.events = {};
		scope.notes = {};
		
		scope.person = {};
		scope.relationships = organizeRelations();
		
		scope.relation = {};
		scope.event = {};
		scope.note = {};
		
		scope.relationTypes = {};
		scope.currentTypes = {};
		
		scope.loggedIn = false;
		scope.failedLogin = false;
		scope.writeAccess = false;
		scope.showEdits = false;
		
		scope.createNewPassword = function(){
			scope.user.createNewPassword = true;
		};
		
		scope.updatePassword = function(){
			
			if (scope.user.newPassword == scope.user.confirmNewPassword){
				
				rest.updatePassword(scope.user.newPassword);
				
				scope.passwordMismatch = '';
				
			} else {
				scope.passwordMismatch = 'Password confirmation did not match new password.  Please try again.';
			}
		};
		
		scope.logIn = function (){
			
			if(scope.user.name && scope.user.password){
				rest.setUserCredentials(scope.user.name, scope.user.password);
				
				rest.getAllPeople(function(data){
					scope.people = data;
				});
				
				rest.getRelationTypes(function(data){
					scope.relationTypes = data;
					
					if (data['male'] != null) {
						scope.loggedIn = true;
						scope.failedLogin = false;
						scope.writeAccess = (data.accessLevel == 'standard' || data.accessLevel == 'administrator');
	
						/*
						 * This is a hack to hide the twitter bootstrap sign in modal on a successful log in
						 */
						$("#sign-on-modal").modal('hide');
					} else {
						scope.failedLogin = true;
					}
				}, function(data){
					scope.failedLogin = true;
				});
				
				scope.user.password = "";
			}
		};
		
		
		
		scope.getNameFromPeople = function(personId){
			var name = "";
			person = scope.people[personId];
			
			if (person) {
				if (person.firstName) name += person.firstName + " ";
				if (person.middleName) name += person.middleName + " ";
				if (person.lastName) name += person.lastName + " ";
				if (person.surname) name += person.surname + " ";
			}
			
			return name.substring(0, name.length - 1);
		};
		
		scope.getPerson = function(personId){		
			rest.getPerson(personId, function(data, status, headers, config){				
				scope.person = data['person'];
				scope.person.lifeSpan = getLifeSpan(scope.person);
				scope.relations = data['relations'];
				scope.events = data['events'];
				scope.notes = data['notes'];
				
				scope.relationships = organizeRelations(data['relations']);
				
				scope.currentTypes = scope.relationTypes[scope.person.gender];
				
				scope.showEdits = scope.writeAccess;
			});		
		};
		
		scope.setPersonInRelation = function(person){
			scope.personSearch = ((person.firstName) ? (person.firstName + " ") : "") +
				((person.middleName) ? (person.middleName + " ") : "") +
				((person.lastName) ? (person.lastName + " ") : "") +
				((person.surname) ? (person.surname + " ") : "");
				
			scope.relation.yourId = person.id;
		};
		
		scope.newPerson = function(){
			scope.person = {};
			scope.relations = {};
			scope.events = {};
			scope.notes = {};
			
			scope.relationships = organizeRelations();
			
			scope.showEdits = false;
		};
		
		scope.deletePerson = function(){
			if (scope.person && scope.person.id) {
				rest.deletePerson(scope.person.id, function(data) {
						delete scope.people[scope.person.id];
						
						scope.relations = {};
						scope.events = {};
						scope.notes = {};
						
						scope.person = {};
						scope.relationships = organizeRelations();
						
						scope.relation = {};
						scope.event = {};
						scope.note = {};
						
						scope.showEdits = false;
						
					}, function(data){
						alert("Deletion failed: \n" + JSON.stringify(data));
					});

			}
		};
		
		scope.submitPerson = function(){
			rest.postPerson(scope.person, function(data){
				scope.person.id = data.personId;
				
				rest.getAllPeople(function(data){
					scope.people = data;
				});
				
				//scope.person = {};
			});
		};
		
		scope.getRelation = function(relation){
			var person = scope.people[relation.yourId];
			
			scope.personSearch = ((person.firstName) ? (person.firstName + " ") : "") +
				((person.middleName) ? (person.middleName + " ") : "") +
				((person.lastName) ? (person.lastName + " ") : "") +
				((person.surname) ? (person.surname + " ") : "");
						
			scope.relation = relation;
		};
		
		scope.newRelation = function(){
			scope.relation = {};
			scope.personSearch = "";
		};
		
		scope.deleteRelation = function(){
			if (scope.relation.id) {
				rest.deleteRelation(scope.relation.id, function(data){
					rest.getRelations(scope.relation.myId, function(data){	
						scope.relations = data;
						scope.relationships = organizeRelations(data);
					});	
					
					scope.relation = {};
				});
			}
		};
		
		scope.submitRelation = function(){
			var rel = scope.relation;
			rel.myId = (rel.myId == null) ? scope.person.id : rel.myId;
			
			rest.postRelation(rel, function(data){
				rest.getRelations(rel.myId, function(data){	
					scope.relations = data;
					scope.relationships = organizeRelations(data);
				});	
				
				scope.relation = {};
			});
			
			scope.relation = {};
			scope.personSearch = "";
		};
		
		scope.getEvent = function(evt){
			scope.event = evt;
		};
		
		scope.newEvent = function(){
			scope.event = {};
		};
		
		scope.deleteEvent = function(){
			if (scope.event.id) {
				rest.deleteEvent(scope.event.id, function(){
					rest.getEvents(scope.person.id, function(data){
						scope.events = data;
					});
					
					scope.event = {};
				});
			}
		};
		
		scope.submitEvent = function (){
			scope.event.personId = scope.person.id;
			
			rest.postEvent(scope.event, function(){
				rest.getEvents(scope.person.id, function(data){
					scope.events = data;
				});
				
				scope.event = {};
			});

		};
		
		scope.getNote = function(note){
			scope.note = note;
		};
		
		scope.newNote = function(){
			scope.note = {};
		};
		
		scope.deleteNote = function(){
			if (scope.note.id) {
				rest.deleteNote(scope.note.id, function(){
					rest.getNotes(scope.person.id, function(data){
						scope.notes = data;
					});
					
					scope.note = {};
				});
			}
		};
		
		scope.submitNote = function (){
			scope.note.personId = scope.person.id;
			rest.postNote(scope.note, function(){
				rest.getNotes(scope.person.id, function(data){
					scope.notes = data;
				});
				
				scope.note = {};
			});

		};
		
		function organizeRelations(relations) {
			var key, rel
			,	relationships = {
					spouses: [],
					parents: [],
					children: [],
					siblings: []
				};
			
			for (key in relations) {
				if (relations.hasOwnProperty(key)) {
					rel = relations[key];
					
					switch (rel.relationship) {
						case '1':
							relationships.spouses.push(rel);
							break;
							
						case '2':
							relationships.children.push(rel);
							break;
							
						case '3':
							relationships.parents.push(rel);
							break;
							
						case '4':
							relationships.siblings.push(rel);
							break;
					}
				}
			}
			
			return relationships;
		}
		
		function getLifeSpan(person) {
			var birth = '', death = '';
			
			if (person.birthMonth != '0') birth += person.birthMonth + '/';
			if (person.birthDay != '0') birth += person.birthDay + '/';
			if (person.birthYear != '0') birth += person.birthYear + '/';
			if (birth.length) birth = birth.substring(0, birth.length - 1);
			
			if (person.deathMonth != '0') death += person.deathMonth + '/';
			if (person.deathDay != '0') death += person.deathDay + '/';
			if (person.deathYear != '0') death += person.deathYear + '/';
			if (death.length) death = death.substring(0, death.length - 1);
			
			if (birth.length && death.length) {
				birth = birth + ' - ' + death;
			}
			
			return birth;
		}

	}]);
	
})();
