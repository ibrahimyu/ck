angular.module('app.controllers')

.controller('editProfileCtrl', function($scope, $api, $state, $ionicPopup, $ionicHistory) {
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		});

	$scope.updateProfile = function() {
		$api.put('/customer/profile', $scope.user)
			.then(function(data) {
				$ionicPopup.alert({
					title: 'Success',
					template: 'Your profile has been updated.'
				}).then(function() {
					$ionicHistory.goBack();
				});
			});
	};
});
