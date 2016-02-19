angular.module('app.controllers')

.controller('creditsCtrl', function($scope, $api) {
	$api.get('/me/credit')
		.then(function(data) {
			$scope.credits = data;
		});
});
