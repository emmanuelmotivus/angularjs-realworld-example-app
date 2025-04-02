import { Component, OnInit } from '@angular/core';
import { AppConstants } from '../../../core/services/app-constants.service';

/**
 * Footer component for the application
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Moved template to external HTML file
 * - Converted constructor DI from 'ngInject' to TypeScript parameter properties
 * - Implemented OnInit interface for initialization logic
 * - Added proper TypeScript types
 * - Maintained the same functionality as the original component
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {
  // Public properties accessible from the template
  appName: string;
  date: Date;

  constructor(private appConstants: AppConstants) {
    this.appName = '';
    this.date = new Date();
  }

  ngOnInit(): void {
    // Initialize component properties
    this.appName = this.appConstants.appName;
    
    // Get today's date to generate the year
    this.date = new Date();
  }
}