angular.module('app.controllers')

.controller('profileCtrl', function($scope, $api) {
	$api.get('/me')
		.then(function(data) {
			$scope.user = data;
		})
		.finally(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
});
