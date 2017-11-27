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
  $scope.validation = {
    url:null
  };
  $scope.orderModel = {
    site: null,
    env:null,
    db:null,
    url:null,
    avail:null,
    shortcode: null,
    itar:null,
    uniq:null,
    mcomm:null,
    free:null
  };
  $scope.resetOrder = function(val){
    $scope.orderModel = {
      site: val,
      env:null,
      db:null,
      url:null,
      shortcode: null,
      itar:null,
      free:null,
      course:null,
      term:null
    };
  };
  $scope.validateUrl = function(){
    // an http request from some service will return true or false for available or not
    // here we are checking on the existence of the string 'not' to mimick this
    if( /[^a-zA-Z0-9]/.test( $scope.orderModel.url ) ) {
       $scope.validation.url = false; $scope.validation.url_reason = 'Only alphanumeric please.';
    } else {
      if($scope.orderModel.url.includes('taken')){
        $scope.validation.url = false;$scope.validation.url_reason = 'Prefix has already been taken.';
      } else {
        $scope.validation.url = true;
      }
    }
  };
  $scope.validateShortCode = function(){
    // an http request via ESB will return metadata that we display, we
    // have no way to validate that the current user has permission to use the shortcode
    // the metadata is there for self-validation
    if( /[^0-9]/.test( $scope.orderModel.shortcode ) ) {
       $scope.validation.shortcode = false; $scope.validation.shortcode_reason = 'Only numeric please.';
    } else {
      if($scope.orderModel.shortcode.includes('0')){
        $scope.validation.shortcode = false;
        $scope.validation.shortcode_reason = 'Shortcode does not exist.';
      } else {
        $scope.validation.shortcode_metadata = {
          'Shortcode':	'185817 - ITS Teach & Learn - Gen Exp (11088)',
          'Shortcode Status':	'Open',
          'Business Unit':	'UMICH',
          'Fund':	'10000 - General',
          'DeptID':	'481094 - ITS Teaching and Learning',
          'Program':	'11088 - General Expense',
          'Class-icr':	'66000 - Admin Computing Support'
        };
        $scope.validation.shortcode = true;
      }
    }
  };



}]);
