'use strict';

require('_stylesheets/index.sass');

angular.module('app', [
    require('_modules/parking'),
    require('_modules/car')
])
    .run(['$rootScope',
        function ($rootScope) {
            $rootScope.NODE_ENV = process.env.NODE_ENV;
        }
    ])
    .config(function () {
    })
    .controller('AppCtrl', ['$scope', function($scope) {
        $scope.title = 'Parking Map';
    }]);