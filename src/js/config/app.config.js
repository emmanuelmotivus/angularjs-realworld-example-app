angular.module('app')
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  'ngInject';

  // Set html5 mode for cleaner URLs
  $locationProvider.html5Mode(true);

  // Set default route
  $urlRouterProvider.otherwise('/');

  // Set up the basic app state
  $stateProvider
  .state('app', {
    abstract: true,
    template: '<app-header></app-header><div ui-view></div><app-footer></app-footer>'
  });
});
