// Import necessary Angular decorators
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { User } from '../core/services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html' // Updated path to match Angular conventions
})
export class CommentComponent {
  // Convert bindings to @Input and @Output
  @Input() data: any; // Type could be more specific with a Comment interface
  @Output() deleteCb = new EventEmitter<any>();
  
  // Property to track if user can modify the comment
  canModify: boolean = false;

  // Angular uses constructor injection instead of 'ngInject'
  constructor(private userService: User) {
    // We'll initialize canModify in ngOnInit instead
  }

  // Use Angular lifecycle hook instead of constructor logic
  ngOnInit() {
    const currentUser = this.userService.current;
    if (currentUser) {
      this.canModify = (currentUser.username === this.data.author.username);
    } else {
      this.canModify = false;
    }
  }

  // Method to handle delete action
  deleteComment() {
    this.deleteCb.emit(this.data.id);
  }
}