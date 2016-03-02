angular.module('app.controllers')

.controller('registerCtrl', function($scope, $auth, $state, $api) {
	$scope.showPassword = true;
	$scope.user = {};
	if ($auth.isAuthenticated()) {
		$state.go('tabs.home');
	}

	$scope.doRegister = function() {
		$scope.loading = true;
		$auth.signup($scope.user)
			.then(function(response) {
				$auth.login({
						email: $scope.user.email,
						password: $scope.user.password
					})
					.then(function(response) {
						$api.registerPush();
						$state.go('tabs.home');
					})
					.catch(function(response) {
						$scope.errors = response;
						$scope.registerError = true;
					})
					.finally(function() {
						$scope.loading = false;
					});
			})
			.catch(function(response) {
				$scope.errors = response;
				$scope.registerError = true;
			})
			.finally(function() {
				$scope.loading = false;
			});
	};
});
