import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- This is a wrapper component that will initially just render 
         the existing AngularJS application as it migrates to Angular -->
    <div class="app-container">
      <!-- The ui-view directive will be used by AngularJS routing -->
      <div ui-view></div>
    </div>
  `,
  styles: []
})
export class AppComponent {
  title = 'Conduit';
}
