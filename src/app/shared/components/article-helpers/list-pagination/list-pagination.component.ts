import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list-pagination',
  templateUrl: './list-pagination.component.html'
})
export class ListPaginationComponent {
  @Input() totalPages: number = 0;
  @Input() currentPage: number = 1;
  @Output() setPage = new EventEmitter<number>();

  // Returns an array of integers from 1 to totalPages
  get pages(): number[] {
    if (this.totalPages <= 0) return [];
    
    return Array.from(new Array(this.totalPages), (val, index) => index + 1);
  }

  setPageTo(pageNumber: number) {
    this.setPage.emit(pageNumber);
  }
}