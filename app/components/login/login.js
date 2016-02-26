angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $state, $api, $translate) {
	if ($auth.isAuthenticated()) {
		$state.go('tabs.home');
	}

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
});
