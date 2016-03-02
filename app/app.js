var ap = 'http://simful.com:1600';
var appId = '574964286293';
var map;

if (localStorage.getItem('debug') == 'true') {
	ap = 'http://localhost:8000';
}

var ak = 'AIzaSyC_PDvtxfbGbkvfRfjLTqrcbNYFLoH2SqA';

angular.module('app', ['ionic', 'app.auth', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'satellizer', 'ngCordova', 'templates', 'pascalprecht.translate'])

.run(function($ionicPlatform, $ionicHistory, $ionicPopup, $auth, $state, $rootScope, $location, $api, $http) {

	function init() {
		if (window.cordova && window.cordova.plugins.Keyboard) {
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		}
		if (window.StatusBar) {
			StatusBar.styleDefault();
		}
	}

	function authenticate() {
		if (!$auth.isAuthenticated()) {
			$state.go('login');
		}
		else {
			$api.registerPush();
			$api.ensurePosition();
		}
	}

	function registerPush() {
		$rootScope.$on('$cordovaPush:notificationReceived', function(event, notification) {
			if (notification.event == 'registered')
			{
				$api.post('/register-push', { token: notification.regid });
			}
		});
	}

	function defineExitState() {
		var exitStates = ['tabs.home', 'login', 'register'];
		var mainStates = ['tabs.orderList', 'tabs.order', 'tabs.more'];
		$ionicPlatform.registerBackButtonAction(function(event) {
			if (mainStates.indexOf($state.current.name) > -1)
			{
				$state.go('tabs.home');
			}
			if (exitStates.indexOf($state.current.name) > -1)
			{
				$ionicPopup.confirm({
					title: 'Exit?',
					template: 'Are you sure you want to exit?'
				}).then(function(res) {
					if (res) {
						ionic.Platform.exitApp();
					}
				});
			} else {
				$ionicHistory.goBack();
			}
		}, 100);
	}

	function checkAuth() {
		$rootScope.$on('$stateChangeStart', function(event, toState) {
			var check = toState.data && toState.data.checkAuth;
			if (check && !$auth.isAuthenticated()) {
				event.preventDefault();
				$state.go('login');
			}
		});
	}

	$ionicPlatform.ready(function() {
		init();
		authenticate();
		registerPush();
		defineExitState();
		checkAuth();

		if (window.plugin) {
            map = window.plugin.google.maps.Map;//.getMap(div);
        }
	});
});

angular.module('app.controllers', []);
angular.module('app.services', []);
angular.module('app.directives', []);
angular.module('templates', []);
