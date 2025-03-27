// Import necessary Angular decorators
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html' // Updated path may need adjustment based on project structure
})
export class ListPaginationComponent {
  // Convert bindings to @Input properties
  @Input() totalPages: number;
  @Input() currentPage: number;
  
  // Create an event emitter to replace the $scope.$emit
  @Output() setPage = new EventEmitter<number>();

  // No need for constructor injection as we're not using $scope anymore
  
  /**
   * Creates an array of page numbers
   * @param total - Total number of pages
   * @returns Array of page numbers
   */
  pageRange(total: number): number[] {
    let pages: number[] = [];

    for (let i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  /**
   * Emits an event when page is changed
   * @param number - Page number to change to
   */
  changePage(number: number): void {
    // Instead of using $scope.$emit, we now use EventEmitter
    this.setPage.emit(number);
  }
}