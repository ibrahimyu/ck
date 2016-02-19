angular.module('app.controllers')

.controller('orderListCtrl', function($scope, $api) {
	$scope.doRefresh = function() {
		$api.get('/customer/order')
			.then(function(data) {
				$scope.orders = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();
})

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
		// getUserPosition
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
})

.controller('viewOrderCtrl', function($scope, $api, $ionicHistory, $stateParams, $ionicPopup) {
	var order_id = $stateParams.id;

	$scope.doRefresh = function() {
		$api.get('/customer/order/' + order_id)
			.then(function(data) {
				$scope.order = data;
			})
			.finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();

	$scope.confirmCancel = function(isConfirming) {
		$ionicPopup.confirm({
			title: 'Confirm',
			template: 'Are you sure you want to cancel this order?'
		}).then(function(res) {
			if (res) {
				$api.post('/customer/cancel-order/' + $scope.order.id)
					.then(function(data) {
						$ionicPopup.alert({
							title: 'Success',
							template: 'Your order has been cancelled.'
						}).then(function() {
							$ionicHistory.goBack();
						});
					});
			}
		});
	};
});
