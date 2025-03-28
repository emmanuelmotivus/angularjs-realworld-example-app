angular.module('app.auth')
.config(function($stateProvider) {
  'ngInject';

  $stateProvider
  .state('app.login', {
    url: '/login',
    controller: 'AuthCtrl as $ctrl',
    template: `
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign In</h1>
              <p class="text-xs-center">
                <a ui-sref="app.register">Need an account?</a>
              </p>
              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="email" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                    Sign in
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  })

  .state('app.register', {
    url: '/register',
    controller: 'AuthCtrl as $ctrl',
    template: `
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Sign Up</h1>
              <p class="text-xs-center">
                <a ui-sref="app.login">Have an account?</a>
              </p>
              <form>
                <fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="text" placeholder="Username">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="email" placeholder="Email">
                  </fieldset>
                  <fieldset class="form-group">
                    <input class="form-control form-control-lg" type="password" placeholder="Password">
                  </fieldset>
                  <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
                    Sign up
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  });
});
