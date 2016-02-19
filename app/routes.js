angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

	// Ionic uses AngularUI Router which uses the concept of states
	// Learn more here: https://github.com/angular-ui/ui-router
	// Set up the various states which the app can be in.
	// Each state's controller can be found in controllers.js
	$stateProvider

	.state('debug', {
		url: '/debug',
		controller: 'debugCtrl',
		template: 'Debug mode activated'
	})

	.state('login', {
		url: '/login',
		controller: 'loginCtrl',
		templateUrl: 'components/login/login.html'
	})

	.state('register', {
		url: '/register',
		controller: 'registerCtrl',
		templateUrl: 'components/login/register.html'
	})

	.state('tabs', {
		url: '/tab',
		abstract: true,
		templateUrl: 'components/layout/tabs.html'
	})

	.state('tabs.home', {
		cache: false,
		url: '/home',
		views: {
			'tab1': {
				templateUrl: 'components/home/home.html',
				controller: 'homeCtrl'
			}
		}
	})

	.state('tabs.order', {
		cache: false,
		url: '/order',
        views: {
            'tab2': {
                templateUrl: 'components/order/order.html',
        		controller: 'orderCtrl'
            }
        }
	})

	.state('tabs.orderSuccess', {
		url: '/order/success',
		views: {
			'tab-misc': {
				templateUrl: 'components/order/order-success.html'
			}
		}
	})

	.state('tabs.orderList', {
		url: '/order-list',
		cache: false,
		views: {
			'tab3': {
				templateUrl: 'components/order/order-list.html',
				controller: 'orderListCtrl'
			}
		}
	})

	.state('tabs.orderDetail', {
		url: '/view-order/:id',
		views: {
			'tab3': {
				templateUrl: 'components/order/order-detail.html',
				controller: 'viewOrderCtrl'
			}
		}
	})

	.state('tabs.laundries', {
		url: '/laundries',
		views: {
			'tab-misc': {
				templateUrl: 'components/laundry/laundries.html',
				controller: 'laundriesCtrl'
			}
		}
	})

	.state('tabs.viewLaundry', {
		url: '/view-laundry/:id',
		views: {
			'tab-misc': {
				templateUrl: 'components/laundry/view-laundry.html',
				controller: 'viewLaundryCtrl'
			}
		}
	})

	.state('tabs.more', {
		url: '/more',
		views: {
			'tab4': {
				templateUrl: 'components/layout/more.html',
				controller: 'moreCtrl'
			}
		}
	})

	.state('tabs.profile', {
		cache: false,
		url: '/profile',
		views: {
			'tab4': {
				templateUrl: 'components/profile/profile.html',
				controller: 'profileCtrl'
			}
		}
	})

	.state('tabs.editProfile', {
		url: '/editProfile',
		views: {
			'tab4': {
				templateUrl: 'components/profile/edit-profile.html',
				controller: 'editProfileCtrl'
			}
		}
	})

	.state('tabs.account', {
		url: '/account',
		views: {
			'tab4': {
				templateUrl: 'components/account/account.html',
				controller: 'accountCtrl'
			}
		}
	})

	.state('tabs.subscribe', {
		url: '/subscribe',
		views: {
			'tab4': {
				templateUrl: 'components/subscription/subscribe.html',
				controller: 'subscribeCtrl'
			}
		}
	})

	.state('tabs.credits', {
		url: '/credits',
		views: {
			'tab4': {
				templateUrl: 'components/credit/credits.html',
				controller: 'creditsCtrl'
			}
		}
	})

	.state('tabs.about', {
		url: '/about',
		views: {
			'tab4': {
				templateUrl: 'components/about/about.html'
			}
		}
	})

	.state('tabs.contact', {
		url: '/contact',
		views: {
			'tab4': {
				templateUrl: 'components/contact/contact.html',
				controller: 'contactCtrl'
			}
		}
	});

	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');

});
