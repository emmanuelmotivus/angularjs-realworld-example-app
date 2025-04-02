import { Component, Input, OnInit } from '@angular/core';

/**
 * ListErrorsComponent
 * 
 * This component displays a list of error messages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Changed '=' binding to @Input() property
 * - Created a separate HTML template file
 * - Added TypeScript interface for errors structure
 * - Implemented OnInit interface for initialization logic
 */

// Interface to define the structure of errors
interface Errors {
  [key: string]: string[];
}

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent implements OnInit {
  // Convert AngularJS '=' two-way binding to Angular @Input
  @Input() errors: Errors;
  
  // Property to store the error messages for display
  errorList: string[] = [];

  constructor() {}

  ngOnInit() {
    this.updateErrorList();
  }

  // Watch for changes to the errors input
  ngOnChanges() {
    this.updateErrorList();
  }

  /**
   * Processes the errors object and converts it to a flat array of error messages
   */
  updateErrorList() {
    this.errorList = [];
    
    if (this.errors) {
      // For each error key, add all associated error messages to the errorList
      for (const key in this.errors) {
        if (this.errors.hasOwnProperty(key)) {
          this.errors[key].forEach((error) => {
            this.errorList.push(`${key} ${error}`);
          });
        }
      }
    }
  }
}