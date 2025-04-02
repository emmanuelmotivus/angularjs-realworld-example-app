import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

/**
 * ListPaginationComponent
 * 
 * This component handles pagination for lists of items.
 * It displays page numbers and allows users to navigate between pages.
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular @Component
 * - Replaced $scope.$emit with an EventEmitter for better parent-child communication
 * - Changed bindings to @Input properties
 * - Added proper TypeScript types
 * - Implemented OnInit interface for initialization logic
 * - Moved template to external HTML file
 */
@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html',
  styleUrls: ['./list-pagination.component.scss']
})
export class ListPaginationComponent implements OnInit {
  // Input properties that replace AngularJS bindings
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  
  // Output event that replaces $scope.$emit
  @Output() setPage = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
    // Initialization logic if needed
  }

  /**
   * Generates an array of page numbers based on the total number of pages
   * @param total The total number of pages
   * @returns An array of page numbers starting from 1
   */
  pageRange(total: number): number[] {
    const pages: number[] = [];

    for (let i = 0; i < total; i++) {
      pages.push(i + 1);
    }

    return pages;
  }

  /**
   * Changes the current page and emits an event to notify the parent component
   * @param number The page number to change to
   */
  changePage(number: number): void {
    this.setPage.emit(number);
  }
}