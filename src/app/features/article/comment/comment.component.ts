import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { UserService } from '../../../core/services/user.service';
import { Comment } from '../../../core/models/comment.model';
import { User } from '../../../core/models/user.model';

/**
 * CommentComponent - Angular component for displaying individual comments
 * 
 * Migration notes:
 * - Converted from AngularJS component to Angular @Component
 * - Changed '=' binding to @Input() for one-way data flow
 * - Changed '&' binding to @Output() with EventEmitter for callback
 * - Injected UserService instead of User service
 * - Added OnInit interface and implemented ngOnInit lifecycle hook
 * - Added proper TypeScript interfaces for Comment and User
 * - Moved template to external HTML file
 * - Added error handling for user authentication check
 */
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  // Input property to receive comment data from parent
  @Input() data!: Comment;
  
  // Output property to emit delete event to parent
  @Output() deleteCb = new EventEmitter<Comment>();
  
  // Flag to determine if current user can modify this comment
  canModify: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Check if user is authenticated and if they are the author of the comment
    try {
      const currentUser: User | null = this.userService.getCurrentUser();
      
      if (currentUser && this.data && this.data.author) {
        this.canModify = (currentUser.username === this.data.author.username);
      } else {
        this.canModify = false;
      }
    } catch (error) {
      console.error('Error determining comment permissions:', error);
      this.canModify = false;
    }
  }

  /**
   * Emits the delete event to parent component
   */
  deleteComment(): void {
    this.deleteCb.emit(this.data);
  }
}