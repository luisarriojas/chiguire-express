'use strict';

var dpControllers = angular.module('dpControllers', []);

dpControllers.controller('dpCtrl', ['$scope', 'Meta',
    function($scope, Meta) {
        $scope.dpMeta = Meta.tags;

        $scope.indexContent = 'este es el index';
    }
]);

dpControllers.controller('homeCtrl', ['$scope', 'Meta', '$http',
    function($scope, Meta, $http) {
        $scope.dpMeta = Meta.tags;
        $scope.dpMeta.description = "Todo en amortiguadores, ballestas y espirales. Envíos a nivel nacional. Valencia, Venezuela.";
        $scope.dpMeta.title = "Home";

        
    }
]);

dpControllers.controller('aboutCtrl', ['$scope', 'Meta', '$routeParams',
    function($scope, Meta, $routeParams) {
        $scope.dpMeta = Meta.tags;
        $scope.dpMeta.description = "Todo en amortiguadores, ballestas y espirales. Envíos a nivel nacional. Valencia, Venezuela.";
        $scope.dpMeta.title = "About";

        $scope.aboutContent = $routeParams.message;
    }
]);
