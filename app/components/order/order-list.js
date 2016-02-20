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
});
