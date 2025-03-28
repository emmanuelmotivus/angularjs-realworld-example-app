angular.module('app')
.factory('HttpInterceptor', function($q) {
  'ngInject';

  return {
    // automatically attach Authorization header
    request: function(config) {
      return config;
    },
    
    // Handle 401
    responseError: function(rejection) {
      return $q.reject(rejection);
    }
  };
});
