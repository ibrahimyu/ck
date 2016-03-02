angular.module('app.controllers')

.controller('orderCtrl', function($scope, $api, $state) {

	$api.get('/customer/order-form')
		.then(function(data) {
			$scope.user = data.user;
			$scope.laundry = data.laundry;
			$scope.packages = data.packages;

			$scope.order = {
				type: 'weight',
				delivery_to: 'home',
				laundry_id: data.laundry.id,
				package: data.packages[0]
			};
		});

	$scope.refreshLocation = function() {
		$api.getPosition(function(position) {
			$scope.delivery_address = position.coords;
		})
		.then(function() {
			$scope.delivery_address = position.coords;
		});
	};

	$scope.refreshLocation();

	$scope.submitOrder = function() {
		$scope.ordering = true;
		$scope.order.package_id = $scope.order.package.id;
		$api.post('/customer/order', $scope.order)
			.then(function(data) {
				$state.go('tabs.orderSuccess');
			})
			.finally(function() {
				$scope.ordering = false;
			});
	};
});
