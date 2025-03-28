import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { Comment } from '../../../../core/models/comment.model';
import { Profile } from '../../../../core/models/profile.model';

/**
 * Comment component displays a single comment in an article
 * 
 * Migration notes:
 * - Converted AngularJS component to Angular @Component
 * - Changed bindings to @Input/@Output properties
 * - Replaced AngularJS DI with Angular constructor injection
 * - Added proper TypeScript interfaces for data models
 * - Implemented OnInit lifecycle hook instead of constructor logic
 * - Changed two-way binding '=' to @Input property
 * - Changed callback binding '&' to EventEmitter @Output
 * - Moved template to external HTML file with proper Angular syntax
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  // Input property replaces the '=' binding from AngularJS
  @Input() data!: Comment;
  
  // Output EventEmitter replaces the '&' binding from AngularJS
  @Output() deleteComment = new EventEmitter<Comment>();
  
  canModify = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Check if current user is the author of the comment
    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.canModify = (currentUser.username === this.data.author.username);
    } else {
      this.canModify = false;
    }
  }

  /**
   * Delete the comment
   * This method emits the deleteComment event with the comment data
   */
  delete(): void {
    this.deleteComment.emit(this.data);
  }
}