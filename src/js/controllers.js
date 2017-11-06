webGateway.controller('homeController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', function($rootScope, $scope, $filter, $timeout, $log) {
  console.log('home');
}]);

webGateway.controller('servicesController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', function($rootScope, $scope, $filter, $timeout, $log) {
  console.log('services');
}]);

webGateway.controller('pricingController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', function($rootScope, $scope, $filter, $timeout, $log) {
  console.log('pricing');
}]);

webGateway.controller('supportController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', function($rootScope, $scope, $filter, $timeout, $log) {
  console.log('support');
}]);

webGateway.controller('orderController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', function($rootScope, $scope, $filter, $timeout, $log) {
  console.log('order');
  $scope.orderModel = {
    site: null,
    env:null,
    db:null,
    url:null,
    shortcode: null,
    itar:null
  };
}]);
