angular.module('app.controllers')

.controller('accountCtrl', function($scope, $api, $ionicPopup, $state) {
	$scope.user = {};

	$scope.changePassword = function() {
		$api.put('/auth/password', $scope.user)
			.then(function(data) {
				$ionicPopup.alert({
					title: 'Success',
					template: 'Your password has successfully changed.'
				}).then(function() {
					$state.go('tabs.more');
				});
			});
	};
});
