import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * ListPaginationComponent
 * 
 * This component handles pagination for lists of articles or other items.
 * It displays page numbers and allows users to navigate between pages.
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Replaced $scope.$emit with an @Output EventEmitter
 * - Changed bindings to @Input properties
 * - Removed AngularJS DI and controller
 * - Added proper TypeScript types
 */
@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html'
})
export class ListPaginationComponent implements OnInit {
  // Convert AngularJS two-way bindings to Angular @Input properties
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  
  // Replace $scope.$emit with an EventEmitter
  @Output() setPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // Initialize component (replaces $onInit from AngularJS)
  }

  /**
   * Creates an array of page numbers based on the total number of pages
   * @param total The total number of pages
   * @returns An array of page numbers
   */
  pageRange(total: number): number[] {
    const pages: number[] = [];

    for (let i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  /**
   * Changes the current page and emits an event to notify parent components
   * @param number The page number to change to
   */
  changePage(number: number): void {
    // Replace $scope.$emit with EventEmitter
    this.setPage.emit(number);
  }
}