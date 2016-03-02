angular.module('app.controllers')

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
