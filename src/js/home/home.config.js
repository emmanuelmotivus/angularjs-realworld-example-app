// Make sure we're defining the state on the correct module
angular.module('app.home')
.config(function($stateProvider) {
  'ngInject';

  $stateProvider.state('app.home', {
    url: '/',
    controller: 'HomeCtrl',
    controllerAs: '$ctrl',
    template: `
      <div class="home-page">
        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle">
                <ul class="nav nav-pills outline-active">
                  <li class="nav-item">
                    <a class="nav-link active">Global Feed</a>
                  </li>
                </ul>
              </div>
              <p>Welcome to Conduit! The place to share your knowledge.</p>
            </div>
            <div class="col-md-3">
              <div class="sidebar">
                <p>Popular Tags</p>
                <div class="tag-list">
                  <a class="tag-pill tag-default">programming</a>
                  <a class="tag-pill tag-default">javascript</a>
                  <a class="tag-pill tag-default">angular</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  });
});
