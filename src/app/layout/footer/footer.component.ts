import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../core/services/app-constants.service';

/**
 * Footer component for the application
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Injected AppConstants service using Angular DI
 * - Moved template to external file (footer.component.html)
 * - Added proper TypeScript types
 * - Implemented OnInit interface for initialization logic
 * - Converted controller class to component class
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  // Application name from constants
  appName: string;
  
  // Current date for copyright year
  date: Date;

  constructor(
    private appConstants: AppConstants
  ) {}

  ngOnInit(): void {
    // Initialize properties in ngOnInit instead of constructor
    this.appName = this.appConstants.appName;
    
    // Get today's date to generate the year
    this.date = new Date();
  }
}