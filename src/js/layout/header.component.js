angular.module('app.layout')
.component('appHeader', {
  template: `
    <nav class="navbar navbar-light">
      <div class="container">
        <a class="navbar-brand" ui-sref="app.home">conduit</a>
        <ul class="nav navbar-nav pull-xs-right">
          <li class="nav-item">
            <a class="nav-link" ui-sref="app.home">Home</a>
          </li>
          
          <!-- Sign in/Sign up buttons -->
          <li class="nav-item">
            <a class="nav-link" ui-sref="app.login">Sign in</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" ui-sref="app.register">Sign up</a>
          </li>
        </ul>
      </div>
    </nav>
  `
});
