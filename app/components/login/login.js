angular.module('app.controllers')

.controller('loginCtrl', function($scope, $auth, $state, $api) {
	if ($auth.isAuthenticated()) {
		$state.go('tabs.home');
	}

	$scope.loadingComplete = true;

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
