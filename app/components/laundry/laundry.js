angular.module('app.controllers')

.controller('laundriesCtrl', function($scope, $api) {
	$scope.doRefresh = function() {
		$api.get('/me')
			.then(function(user) {
				$api.get('/customer/laundries')
					.then(function(data) {
						$scope.laundries = data;
					}).finally(function() {
						$scope.$broadcast('scroll.refreshComplete');
					});
			});
	};

	$scope.doRefresh();
})

.controller('viewLaundryCtrl', function($scope, $api, $state, $stateParams, $ionicPopup) {
	$scope.doRefresh = function() {
		$api.get('/me')
			.then(function(user) {
				$api.get('/customer/view-laundry/' + $stateParams.id)
					.then(function(data) {
						$scope.laundry = data;

						if (user.preferred_laundry_id == $stateParams.id)
							$scope.preferredLaundry = true;
					})
					.finally(function() {
						$scope.$broadcast('scroll.refreshComplete');
					});
			});
	};

	$scope.setPreferredLaundry = function() {
		$api.put('/customer/profile', {
				preferred_laundry_id: $stateParams.id
			})
			.then(function(data) {
				$ionicPopup.alert({
					title: 'Success',
					template: 'This laundry has been set as your preferred laundry.'
				}).then(function() {
					$scope.preferredLaundry = true;
					$state.go('tabs.order');
				})
			});
	};

	$scope.doRefresh();
});
