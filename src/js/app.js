// Define all required modules first
angular.module('templates', []);
angular.module('app.layout', []);
angular.module('app.components', []);
angular.module('app.home', []);
angular.module('app.profile', []);
angular.module('app.article', []);
angular.module('app.services', []);
angular.module('app.auth', []);
angular.module('app.settings', []);
angular.module('app.editor', []);

// Create the main app module
angular.module('app', [
  'ui.router',
  'ngSanitize',
  'templates',
  'app.layout',
  'app.components',
  'app.home',
  'app.profile',
  'app.article',
  'app.services',
  'app.auth',
  'app.settings',
  'app.editor'
])
// Set up manual bootstrap when DOM is ready
angular.element(document).ready(function() {
  console.log('Bootstrapping AngularJS app...');
  try {
    angular.bootstrap(document, ['app']);
    console.log('App bootstrapped successfully!');
    
    // Log the registered states
    var $state = angular.element(document).injector().get('$state');
    console.log('States:', $state.get());
  } catch (e) {
    console.error('Error bootstrapping app:', e);
  }
});
