angular.module('app')
.run(function($rootScope, $state) {
  'ngInject';

  // Set default page title
  $rootScope.pageTitle = 'Conduit';

  // Helper function for setting the page title
  $rootScope.setPageTitle = function(title) {
    if (title) {
      $rootScope.pageTitle = title + ' — Conduit';
    } else {
      $rootScope.pageTitle = 'Conduit';
    }
  };

  // Default to home state if no state is matched
  $rootScope.$on('$stateChangeError', function() {
    $state.go('app.home');
  });
  
  // Debug state changes
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    console.log('State change: ', toState.name);
  });
  
  // Track successful state changes
  $rootScope.$on('$stateChangeSuccess', function(event, toState) {
    // Update page title
    $rootScope.setPageTitle(toState.title);
    
    // Scroll to top on state change
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  });
});
