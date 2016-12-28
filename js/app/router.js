angular.module('andegan').config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('login', {
            url: '/',
            templateUrl: 'views/login/login.html',
            reloadOnSearch: false,
            controller: 'LoginController',
            data: {
                requiredlogin: false
            }
        })
        .state('home', {
            url: '/home',
            templateUrl: 'views/home/home.html',
            reloadOnSearch: false,
            controller: 'LoginController',
            data: {
                requiredlogin: false
            }
        });
});