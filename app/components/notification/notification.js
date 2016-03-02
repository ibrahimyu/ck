angular.module('app')

.controller('NotificationsCtrl', function($scope, $localstorage) {
	$scope.notifications = [
		{
			'subject': 'Your order has been accepted!',
			'content': 'Order hereeee~',
			'link': 'orders.tabs',
			'icon': 'ion-person'
		}
	];

	//$scope.notifications = $localstorage.getObject('notification.items');
});
