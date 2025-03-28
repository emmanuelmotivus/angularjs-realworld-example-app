import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml, Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import * as marked from 'marked';

import { Article } from '../../../../core/models/article.model';
import { Comment } from '../../../../core/models/comment.model';
import { User } from '../../../../core/models/user.model';
import { ArticleService } from '../../../../core/services/article.service';
import { CommentsService } from '../../../../core/services/comments.service';
import { UserService } from '../../../../core/services/user.service';
import { Errors } from '../../../../core/models/errors.model';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit {
  article: Article;
  comments: Comment[] = [];
  currentUser: User;
  canModify: boolean = false;
  isDeleting: boolean = false;
  isSubmitting: boolean = false;
  sanitizedBody: SafeHtml;
  
  commentForm = {
    isSubmitting: false,
    body: '',
    errors: {} as Errors
  };

  constructor(
    private articleService: ArticleService,
    private commentsService: CommentsService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Retrieve the prefetched article
    this.route.data.subscribe(
      (data: { article: Article }) => {
        this.article = data.article;
        
        // Set page title
        this.titleService.setTitle(this.article.title);
        
        // Convert Markdown to HTML and sanitize
        this.sanitizedBody = this.sanitizer.bypassSecurityTrustHtml(
          marked(this.article.body, { sanitize: true })
        );
        
        // Load comments
        this.loadComments();
        
        // Load the current user's data
        this.userService.currentUser.subscribe(
          (userData: User) => {
            this.currentUser = userData;
            
            // Check if the current user is the author of this article
            this.canModify = this.currentUser && 
              this.currentUser.username === this.article.author.username;
          }
        );
      }
    );
  }

  loadComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  resetCommentForm() {
    this.commentForm = {
      isSubmitting: false,
      body: '',
      errors: {} as Errors
    };
  }

  addComment() {
    this.commentForm.isSubmitting = true;

    this.commentsService.add(this.article.slug, this.commentForm.body)
      .pipe(
        finalize(() => {
          this.commentForm.isSubmitting = false;
        })
      )
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.resetCommentForm();
        },
        err => {
          this.commentForm.errors = err.error.errors;
        }
      );
  }

  deleteComment(commentId: number, index: number) {
    this.commentsService.destroy(commentId, this.article.slug)
      .subscribe(
        success => {
          this.comments.splice(index, 1);
        }
      );
  }

  deleteArticle() {
    this.isDeleting = true;
    
    this.articleService.destroy(this.article.slug)
      .pipe(
        finalize(() => {
          this.isDeleting = false;
        })
      )
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        }
      );
  }
}