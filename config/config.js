(function(){
	var familyConfig = angular.module('familyConfiguration', []);
	
	familyConfig.factory('FamilyConfig', function() {
		return {
			baseRestUrl: "/familytree/dev/rest/",
			baseAdminUrl: "/familytree/dev/admin/rest/"
		};
	});
})();
