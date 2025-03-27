// Import Angular core functionality
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import marked from 'marked';

// Import services
import { CommentsService } from '../services/comments.service';
import { UserService } from '../services/user.service';

// Convert AngularJS controller to Angular component
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html'
})
export class ArticleComponent implements OnInit {
  // Properties moved from controller to component class
  article: any;
  comments: any[];
  currentUser: any;
  commentForm: {
    isSubmitting: boolean;
    body: string;
    errors: any[];
  };

  // Replace AngularJS dependency injection with Angular DI
  constructor(
    private commentsService: CommentsService,
    private userService: UserService,
    private sanitizer: DomSanitizer,
    private titleService: Title
  ) {
    this.resetCommentForm();
  }

  // Use Angular lifecycle hook instead of constructor initialization
  ngOnInit() {
    // Assuming article is passed via route resolver
    // this.article would be set from route data
    
    this.currentUser = this.userService.getCurrentUser();
    
    // Set page title using Angular Title service instead of $rootScope
    this.titleService.setTitle(this.article.title);
    
    // Use Angular's sanitizer instead of $sce
    this.article.body = this.sanitizer.bypassSecurityTrustHtml(
      marked(this.article.body, { sanitize: true })
    ) as SafeHtml;
    
    // Convert promise-based API call to Observable (still using then for compatibility)
    this.commentsService.getAll(this.article.slug).then(
      (comments) => this.comments = comments
    );
  }

  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: []
    };
  }

  addComment() {
    this.commentForm.isSubmitting = true;

    // Call service method (now returns Observable but using then for compatibility)
    this.commentsService.add(this.article.slug, this.commentForm.body).then(
      (comment) => {
        this.comments.unshift(comment);
        this.resetCommentForm();
      },
      (err) => {
        this.commentForm.isSubmitting = false;
        this.commentForm.errors = err.data.errors;
      }
    );
  }

  deleteComment(commentId: string, index: number) {
    // Call service method (now returns Observable but using then for compatibility)
    this.commentsService.destroy(commentId, this.article.slug).then(
      (success) => {
        this.comments.splice(index, 1);
      }
    );
  }
}

// No need for export default in Angular
// The class is exported directly with the export keyword above