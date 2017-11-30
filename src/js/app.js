var webGateway = angular.module( "webGateway", ['ngRoute', 'ngAnimate'] );

webGateway.run(function($rootScope) {
});

webGateway.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
    when('/', {
      templateUrl: 'src/views/home.html',
      controller: 'homeController'
    }).
    when('/services', {
      templateUrl: 'src/views/services.html',
      controller: 'servicesController'
    }).
    when('/pricing', {
      templateUrl: 'src/views/pricing.html',
      controller: 'pricingController'
    }).
    when('/support', {
      templateUrl: 'src/views/support.html',
      controller: 'supportController'
    }).
    when('/order', {
      templateUrl: 'src/views/order.html',
      controller: 'orderController'
    }).
    otherwise({
      redirectTo: '/'
    });
  }
]);
