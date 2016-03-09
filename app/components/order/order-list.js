angular.module('app.controllers')

.controller('orderListCtrl', function($scope, $api, $stateParams) {
	$scope.orderStatus = $stateParams.status || 'new';
	$scope.filterOrder = function(status)	{
		$scope.orderStatus = status;
		$scope.doRefresh();
	};

	$scope.doRefresh = function() {
		$api.get('/customer/order?status=' + $scope.orderStatus)
			.then(function(data) {
				$scope.orders = data;
			}).finally(function() {
				$scope.$broadcast('scroll.refreshComplete');
			});
	};

	$scope.doRefresh();
});
