'use strict';

var dpApp = angular.module('dpApp', ['ngRoute', 'dpControllers', 'dpServices']);

/* router */
dpApp.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/home', {
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        }).
        when('/about/:message', {
            templateUrl: 'templates/about.html',
            controller: 'aboutCtrl'
        }).
        otherwise({
            redirectTo: '/home'
        });
    }
]);

/* fix to crawlers */
dpApp.config(['$locationProvider',
    function($locationProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');
    }
]);

/* services */
var dpServices = angular.module('dpServices', []);
dpServices.factory('Meta', [

    function() {
        return {
            tags: {
                description: '',
                title: ''
            }
        }
    }
]);