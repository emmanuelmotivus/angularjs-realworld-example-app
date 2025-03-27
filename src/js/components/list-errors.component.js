// Import necessary Angular decorators
import { Component, Input } from '@angular/core';

/**
 * ListErrorsComponent - Converted from AngularJS component to Angular component
 * Changes:
 * - Added @Component decorator with selector and templateUrl
 * - Changed binding from '=' to @Input() property
 * - Removed export default and exported the class directly
 */
@Component({
  selector: 'app-list-errors',
  templateUrl: './list-errors.component.html' // Path may need adjustment based on project structure
})
export class ListErrorsComponent {
  // Changed from bindings: { errors: '=' } to @Input() property
  @Input() errors: any;
}