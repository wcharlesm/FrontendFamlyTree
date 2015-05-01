(function(){
	var familyAuth = angular.module('familyAuthentication', []);
	
	familyAuth.factory('FamilyAuth', ['$http', function(http) {
		var username, password, b64;
		
		return {
			process: function(req, success, error) {
				var url = req.url;
				
				if ( (url.length - url.indexOf(".php") ) == 4){
					req.url = req.url + "?username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
				} else {
					req.url = req.url + "&username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
				}
				
				http(req).success(success).error(error);
			},
			
			setCredentials: function(un, pw) {			
				username = un;
				password = pw;
	
			},
			
			hash: function(str) {
				if (CryptoJS && CryptoJS.SHA512) {
					return CryptoJS.SHA512(str);
				} else {
					return str;
				}
			}
		};
	}]);
})();