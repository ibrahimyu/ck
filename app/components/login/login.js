angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $state, $api, $translate) {
	$scope.loadingComplete = true;

	$scope.active_language = localStorage.getItem('lang') || 'en';
	$scope.setLanguage = function(lang) {
		$translate.use(lang);
		localStorage.setItem('lang', lang);
		$scope.active_language = lang;
	};

	$scope.user = {};

	$scope.doLogin = function() {
		$scope.loadingComplete = false;

		var user = {
			email: $scope.user.email,
			password: $scope.user.password
		};

		$auth.login(user)
			.then(function(response) {
				$auth.setToken(response);
				$api.registerPush();
				$state.go('tabs.home');
			})
			.catch(function(response) {
				$scope.loginError = true;
			})
			.finally(function() {
				$scope.loadingComplete = true;
			});
	};

	$scope.authenticate = function(provider) {
		$auth.authenticate(provider)
			.then(function(response) {
				$state.go('tabs.home');
			});
	};
});
