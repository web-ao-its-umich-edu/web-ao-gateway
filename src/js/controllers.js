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
  $scope.failedValidation ={};
  $scope.validationModel = {
    "url": null,
    "shortcode_metadata": null,
    "shortcode": null,
    "shortcode_reason": null
  };
  $scope.orderModel = {
    site: null,
    env: null,
    db: null,
    url: null,
    avail: null,
    shortcode: null,
    itar: null,
    uniq: null,
    mcomm: null,
    free: null
  };
  $scope.resetOrder = function(val) {
    for (var key in $scope.orderModel ) {
      $scope.orderModel[key] = null;
    }
    for (var key in $scope.validationModel ) {
      $scope.validationModel[key] = null;
    }
  };
  $scope.validateUrl = function() {
    if ($scope.orderModel.url) {
      if (/[^a-zA-Z0-9]/.test($scope.orderModel.url)) {
        $scope.validationModel.url = false;
        $scope.validationModel.url_reason = 'Only alphanumeric please.';
      } else {
        if ($scope.orderModel.url.includes('taken')) {
          $scope.validationModel.url = false;
          $scope.validationModel.url_reason = 'Prefix has already been taken.';
        } else {
          $scope.validationModel.url = true;
        }
      }
    } else {
      $scope.validationModel.url = false;
      $scope.validationModel.url_reason = 'Please supply a prefix.';
    }
  };
  $scope.validateShortCode = function() {

    // an http request via ESB will return metadata that we display, we
    // have no way to validate that the current user has permission to use the shortcode
    // the metadata is there for self-validation
    if ($scope.orderModel.shortcode) {
      if (/[^0-9]/.test($scope.orderModel.shortcode)) {
        $scope.validationModel.shortcode_metadata = null;
        $scope.validationModel.shortcode = false;
        $scope.validationModel.shortcode_reason = 'Only numeric please.';
      } else {
        if ($scope.orderModel.shortcode.includes('0')) {
          $scope.validationModel.shortcode = false;
          $scope.validationModel.shortcode_reason = 'Shortcode does not exist.';
        } else {
          $scope.validationModel.shortcode_metadata = {
            'Shortcode': '185817 - ITS Teach & Learn - Gen Exp (11088)',
            'Shortcode Status': 'Open',
            'Business Unit': 'UMICH',
            'Fund': '10000 - General',
            'DeptID': '481094 - ITS Teaching and Learning',
            'Program': '11088 - General Expense',
            'Class-icr': '66000 - Admin Computing Support'
          };
          $scope.validationModel.shortcode = true;
        }
      }
    } else {
      $scope.validationModel.shortcode = false;
      $scope.validationModel.shortcode_reason = 'Please supply a shortcode.';
      $scope.validationModel.shortcode_metadata = null;
    }
  };
  $scope.validateAndPreview = function(){
    $scope.failedValidation = {};
    // validate common object key/values
    //$scope.failedValidation = false;
    if(!$scope.orderModel.site){
      //$scope.failedValidation = true;
      $scope.failedValidation.site = true;
    }
    if(!$scope.orderModel.env){
      $scope.failedValidation.env = true;
    }
    if(!$scope.orderModel.url){
      $scope.failedValidation.url = true;
    }
    if(!$scope.orderModel.avail){
      $scope.failedValidation.avail = true;
    }
    if(!$scope.orderModel.itar){
      $scope.failedValidation.itar = true;
    }
    if(!$scope.orderModel.uniq){
      $scope.failedValidation.uniq = true;
    }
    if(!$scope.orderModel.mcomm){
      $scope.failedValidation.mcomm = true;
    }

    if($scope.orderModel.env !=='google' || !$scope.orderModel.free){
      if(!$scope.orderModel.shortcode){
        $scope.failedValidation.shortcode = true;
      }
    }
    if(angular.equals($scope.failedValidation, {})){
      $('#requestPreview').modal('toggle');
    } else {
      $scope.failedValidationGlobal = true;
    }


  };


}]);
