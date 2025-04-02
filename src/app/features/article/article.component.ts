import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import * as marked from 'marked';

// Import services and models
import { ArticleService } from '../../core/services/article.service';
import { UserService } from '../../core/services/user.service';
import { CommentsService } from '../../core/services/comments.service';
import { Article } from '../../core/models/article.model';
import { Comment } from '../../core/models/comment.model';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  // Article data
  article: Article;
  articleBody: SafeHtml;
  comments: Comment[] = [];
  currentUser: User;
  
  // Comment form
  commentForm = {
    isSubmitting: false,
    body: '',
    errors: {}
  };

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    // Get article from the resolver
    this.article = this.route.snapshot.data.article;
    
    // Get current user
    this.currentUser = this.userService.getCurrentUser();
    
    // Set page title
    this.titleService.setTitle(this.article.title);
    
    // Sanitize and render markdown
    this.articleBody = this.sanitizer.bypassSecurityTrustHtml(
      marked(this.article.body, { sanitize: true })
    );
    
    // Load comments
    this.loadComments();
    
    // Initialize comment form
    this.resetCommentForm();
  }

  /**
   * Load all comments for the current article
   */
  loadComments(): void {
    this.commentsService.getAll(this.article.slug)
      .subscribe(
        (comments: Comment[]) => {
          this.comments = comments;
        },
        error => {
          console.error('Error loading comments', error);
        }
      );
  }

  /**
   * Reset the comment form to its initial state
   */
  resetCommentForm(): void {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: {}
    };
  }

  /**
   * Add a new comment to the article
   */
  addComment(): void {
    this.commentForm.isSubmitting = true;

    this.commentsService.add(this.article.slug, this.commentForm.body)
      .pipe(
        finalize(() => {
          this.commentForm.isSubmitting = false;
        })
      )
      .subscribe(
        (comment: Comment) => {
          this.comments.unshift(comment);
          this.resetCommentForm();
        },
        errors => {
          this.commentForm.errors = errors?.error?.errors || {};
        }
      );
  }

  /**
   * Delete a comment from the article
   * @param commentId The ID of the comment to delete
   * @param index The index of the comment in the comments array
   */
  deleteComment(commentId: string, index: number): void {
    this.commentsService.destroy(commentId, this.article.slug)
      .subscribe(
        () => {
          this.comments.splice(index, 1);
        },
        error => {
          console.error('Error deleting comment', error);
        }
      );
  }
}