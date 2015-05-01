(function(){
	
	var familyFilters = angular.module('familyFilters', []);
	
	familyFilters.filter('peopleFilterImproved', function(){
		return function(people, filter){

			if (filter == null) return people;
			
			var t, term, terms = filter.split(" ")
			,	keeper;
			
			var key, person, newPeople = [];
			
			for (key in people) {
				person = people[key];
				keeper = true;
				
				for (t in terms){
					term = terms[t];
					keeper = (thatInThis(term, person.firstName) || thatInThis(term, person.middleName) || thatInThis(term, person.lastName)) && keeper;
				}
				
				if (keeper) newPeople.push(person);
			}
			
			return newPeople;
		};
	});
	
	function thatInThis(that, inThis){
		return (inThis.indexOf(that) != -1);
	}		

})();
