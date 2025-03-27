// footer.component.ts
import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../config/app.constants';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html' // Updated path assuming template is moved to Angular standard location
})
export class FooterComponent implements OnInit {
  // Properties
  appName: string;
  date: Date;

  constructor(private appConstants: AppConstants) {
    // Inject AppConstants service
    this.appName = this.appConstants.appName;
    
    // Get today's date to generate the year
    this.date = new Date();
  }

  ngOnInit(): void {
    // Angular lifecycle hook for initialization logic
    // No initialization needed beyond constructor, but included for completeness
  }
}

// Note: The original AngularJS component export is removed as Angular uses
// the @Component decorator and exports the class directly.
// The component will need to be declared in an Angular module.