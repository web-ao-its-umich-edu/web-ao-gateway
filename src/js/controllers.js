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

webGateway.controller('orderController', ['$rootScope', '$scope', '$filter', '$timeout', '$log', 'focus', function($rootScope, $scope, $filter, $timeout, $log, focus) {
  //setting up some initial values
  $scope.terms =['Fall', 'Winter','Spring', 'Summner', 'Spring-Summer']

  $scope.failedValidation = {};
  $scope.validationModel = {
    "url": null,
    "shortcode_metadata": null,
    "shortcode": null,
    "shortcode_reason": null
  };
  $scope.orderModel = {
    env: null,
    db: null,
    url: null,
    avail: null,
    shortcode: null,
    itar: null,
    uniq: null,
    mcomm: null,
    free:null,
    course:null,
    term:null
  };

  //reset validation after any changes to orderModel
  $scope.$watch('orderModel', function() {
    $scope.failedValidation = {};
    if (
       $scope.orderModel.env !== null &&
       $scope.orderModel.url !== null  &&
       $scope.orderModel.uniq !== null &&
       $scope.orderModel.itar !== null &&
       $scope.orderModel.mcomm !== null &&
       (
         (
           $scope.orderModel.free !== null &&
           $scope.orderModel.course !==null &&
           $scope.orderModel.term !==null
         ) ||
         $scope.orderModel.free === null && $scope.orderModel.shortcode !==null
       )
      )
      {
        $scope.orderComplete = true;
      }
  }, true);

  //reset all values of orderModel (triggered when switching between app and site)
  $scope.resetOrder = function(val) {
    for (var key in $scope.orderModel) {
      $scope.orderModel[key] = null;
    }
    for (var key in $scope.validationModel) {
      $scope.validationModel[key] = null;
    }
    $scope.orderComplete = false
  };
  //validate URL prefix, triggered by blur on input
  $scope.validateUrl = function() {
    //is there a value?
    if ($scope.orderModel.url) {
      //is it alphanum?
      if (/[^a-zA-Z0-9]/.test($scope.orderModel.url)) {
        $scope.validationModel.url = false;
        $scope.validationModel.url_reason = 'Only alphanumeric please.';
        //pass the focus to the message
        $scope.$evalAsync(function() {
          focus('urlValidationMessage');
        });
      } else {
        //is is taken? Right now this is bogus, in future we will
        // get this information by some http request from somewhere
        if ($scope.orderModel.url.includes('taken')) {
          $scope.validationModel.url = false;
          $scope.validationModel.url_reason = 'Prefix has already been taken.';
          //pass the focus to the message
          $scope.$evalAsync(function() {
            focus('urlValidationMessage');
          });

        } else {
          $scope.validationModel.url = true;
        }
      }
    } else {
      // there was no value in input - prompt
      $scope.validationModel.url = false;
      $scope.validationModel.url_reason = 'Please supply a prefix.';
    }
  };
  $scope.validateShortCode = function() {
    // an http request via ESB will return metadata that we display, we
    // have no way to validate that the current user has permission to use the shortcode
    // the metadata is there for self-validation

    //a successfull request will return the following

    var shortcodeResponse = {
      "ShortCodes": {
        "ShortCode": {
          "shortCode": "185817",
          "shortCodeDescription": "ITS Teach & Learn - Gen Exp (11088)",
          "shortCodeStatus": "O",
          "ShortCodeStatusDescription": "Open",
          "fundCode": "10000",
          "deptID": "481094",
          "programCode": "11088",
          "class": "66000",
          "projectGrant": "",
          "class2": ""
        }
      }
    };
    //a shortcode that does not exist will return a 404 Status
    //and the parsimonious payload of
    //{"ShortCodes":""}

    //is there a value?
    if ($scope.orderModel.shortcode) {
      //is it numeric? TODO: what are shortcodes really like?
      if (/[^0-9]/.test($scope.orderModel.shortcode)) {
        $scope.validationModel.shortcode_metadata = null;
        $scope.validationModel.shortcode = false;
        $scope.validationModel.shortcode_reason = 'Only numeric please.';
        $scope.$evalAsync(function() {
          focus('shortcodeValidationMessage');
        });

      } else {
        // TODO: in future we will use the shotcode to query the ESB, which
        // will return metadata about the shortcode or an error message
        // here we are mimicking the later condition by checking for a 0 in
        // the input
        if ($scope.orderModel.shortcode.includes('0')) {
          $scope.validationModel.shortcode = false;
          $scope.validationModel.shortcode_reason = 'Shortcode does not exist.';
          $scope.$evalAsync(function() {
            focus('shortcodeValidationMessage');
          });
        } else {
          // shortcode is real, servive returned metadata, display it
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
      // input is blank
      $scope.validationModel.shortcode = false;
      $scope.validationModel.shortcode_reason = 'Please supply a shortcode.';

      $scope.validationModel.shortcode_metadata = null;
      $scope.$evalAsync(function() {
        focus('shortcodeValidationMessage');
      });

    }
  };

  // final validation - triggered by Preview Request button
  // works by adding key/vals to the $scope.failedValidation object
  $scope.validateAndPreview = function() {
    $scope.failedValidation = {};
    if (!$scope.orderModel.env) {
      $scope.failedValidation.env = true;
    }
    if (!$scope.orderModel.url) {
      $scope.failedValidation.url = true;
    }
    if (!$scope.orderModel.uniq) {
      $scope.failedValidation.uniq = true;
    }
    if (!$scope.orderModel.mcomm) {
      $scope.failedValidation.mcomm = true;
    }
    if ($scope.orderModel.itar === null) {
      $scope.failedValidation.itar = true;
    }

    // only bother to validate shortcode if the orderModel requires it
    if (!$scope.orderModel.free) {
      if (!$scope.orderModel.shortcode) {
        $scope.failedValidation.shortcode = true;
      }
    }
    if ($scope.orderModel.free) {
      if (!$scope.orderModel.course) {
        $scope.failedValidation.course = true;
      }
      if (!$scope.orderModel.term) {
        $scope.failedValidation.term = true;
      }

    }

    // if $scope.failedValidation is an empty object
    // show modal with request preview
    if (angular.equals($scope.failedValidation, {})) {
      $('#requestPreview').modal('toggle');
    } else {
      // set a global that will display the Oops message
      $scope.failedValidationGlobal = true;
    }
  };
  $scope.passFocus = function (id){
    $scope.$evalAsync(function() {
      focus(id);
    });

  }

}]);
