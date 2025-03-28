import { Component, Input, OnInit, OnChanges } from '@angular/core';

/**
 * ListErrorsComponent
 * 
 * This component displays a list of error messages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular component
 * - Changed two-way binding '=' to Angular @Input property
 * - Moved template to external HTML file (handled by Angular CLI)
 * - Added TypeScript interface for errors object structure
 * - Added OnInit interface for proper lifecycle management
 */

// Interface to define the structure of the errors object
interface Errors {
  [key: string]: string[];
}

@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html'
})
export class ListErrorsComponent implements OnInit, OnChanges {
  // Input property to receive errors from parent component
  // In Angular, we use @Input() for one-way binding instead of AngularJS's '='
  @Input() errors: Errors = {};
  
  // Property to store the error messages for display in the template
  errorList: string[] = [];

  constructor() {}

  ngOnInit() {
    this.updateErrorList();
  }

  // This method is called whenever the errors input changes
  ngOnChanges() {
    this.updateErrorList();
  }

  // Helper method to transform the errors object into a flat array of error messages
  private updateErrorList() {
    this.errorList = [];
    
    if (this.errors) {
      // Loop through each error key and add all associated messages to the errorList
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