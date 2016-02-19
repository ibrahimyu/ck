angular.module('app.controllers')

.controller('moreCtrl', function($scope, $auth, $state, $ionicPopup) {
	$scope.logout = function() {
		$ionicPopup.confirm({
			title: 'Confirm',
			template: 'Are you sure you want to log out?'
		}).then(function(res) {
			if (res) {
				$auth.logout();
				$state.go('login');
			}
		})
	};
})

.controller('debugCtrl', function() {
	localStorage.setItem('debug', true);
});
