angular.module('app.controllers')

.controller('homeCtrl', function($scope, $api, $geolocation) {
	$scope.doRefresh = function() {
		$api.get('/customer/home')
			.then(function(data) {
				$scope.user = data.user;
				$scope.laundry = data.laundry;
				$scope.active_orders = data.orders;

				if (!$scope.laundry.distance) {
					$scope.laundry.distance = $geolocation.calculateDistance(
						$scope.user.lat,
						$scope.user.lng,
						$scope.laundry.lat,
						$scope.laundry.lng
					);
				}

			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();
});
