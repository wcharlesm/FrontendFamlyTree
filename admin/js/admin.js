var adminServices = angular.module('adminServices', ['familyConfiguration', 'familyAuthentication']);

adminServices.factory('AdminRest', ['$http', 'FamilyConfig', 'FamilyAuth', function(http, config, auth){
	function print(next){
		return function(data){
			console.log(JSON.stringify(data));
			next(data);
		};
	}
		
	function get(url, success, error){
		success = (success == null) ? function(){} : success;
		error = (error == null) ? function(){} : error; 
		
		auth.process( { method: 'GET', url: (config.baseAdminUrl + url) }, print(success), print(error));
	}
	
	function post(url, success, error){
		success = (success == null) ? function(){} : success;
		error = (error == null) ? function(){} : error; 
		
		auth.process( { method: 'POST', url: (config.baseAdminUrl + url) }, print(success), print(error));
	}
	
	return {
		createUser: function(un, pw, success, error){
			var username = un
			,	password = pw;
				
			var url = "User.php?newUserName=" + encodeURIComponent(username) + "&newUserPassword=" + encodeURIComponent(password);
			
			post(url, success, error);
		},
		
		getUsers: function(success, error) {
			var url = "Users.php";
			
			post(url, success, error);
		},
		
		authenticate: function (un, pw, success, error){
			
			auth.setCredentials(un, pw);
			
			var url = "Authenticate.php";
			
			get(url, success, error);
		}
	};
}]);


var adminControllers = angular.module('adminControllers', ['adminServices']);

adminControllers.controller('AdminCtrl', ['$scope', 'AdminRest', function(scope, rest){
	scope.user = {};
	scope.users = {};
	scope.viewPage = false;
	scope.viewLogin = true;
	scope.newUser = {};
	scope.message = "";
	
	scope.createUser = function(){
		if (scope.newUser && scope.newUser.name && scope.newUser.password){

			rest.createUser(scope.newUser.name, scope.newUser.password, success, error);

			var success = function(){ 
				scope.message = "User successfully created.";
			};
			
			var error = function(data){ 
				scope.message = "Error in user creation."; 
			};	
		}
	};
	
	scope.login = function(){
		
		rest.authenticate(scope.user.name, scope.user.password, function(data){
			
			scope.user.password = "";
			scope.viewPage = (data['access'] == 'administrator');
			scope.viewLogin = !(scope.viewPage);
			
			scope.message = "just authenticated";
			
			if (scope.viewPage) {
				rest.getUsers(function(data){
					scope.users = data;
				});
				
				/*
				 * This is a hack to hide the twitter bootstrap sign in modal on a successful log in
				 */
				$("#sign-on-modal").modal('hide');
			}
		});
	};
}]);


var admin = angular.module('admin', ['adminControllers']);





