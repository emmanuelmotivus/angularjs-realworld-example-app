import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Comment } from '../../../../core/models/comment.model';
import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-article-comment',
  templateUrl: './comment.component.html'
})
export class CommentComponent implements OnInit {
  @Input() comment!: Comment;
  @Output() deleteComment = new EventEmitter<boolean>();

  canModify: boolean = false;

  constructor(
    private userService: UserService
  ) {}

  ngOnInit() {
    // Determine if the current user is the author of this comment
    this.userService.currentUser.subscribe(
      (userData: User | null) => {
        this.canModify = (userData?.username === this.comment.author.username);
      }
    );
  }

  delete() {
    this.deleteComment.emit(true);
  }
}
