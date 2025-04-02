import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from '../../../core/services/articles.service';
import { UserService } from '../../../core/services/user.service';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html'
})
export class ArticleActionsComponent implements OnInit {
  // Convert AngularJS '=' binding to Angular @Input()
  @Input() article: Article;
  
  // Component properties
  canModify: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  /**
   * Initialize component and check if current user can modify the article
   * Replaces the constructor logic from AngularJS
   */
  ngOnInit(): void {
    // Check if current user is the author of the article
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.canModify = (currentUser.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
  }

  /**
   * Delete the current article and navigate to home page
   * Converted from AngularJS promise-based approach to RxJS Observable
   */
  deleteArticle(): void {
    this.isDeleting = true;
    
    // Using RxJS subscribe instead of promise then/catch
    this.articlesService.deleteArticle(this.article.slug)
      .subscribe(
        // Success handler
        () => {
          this.router.navigateByUrl('/');
        },
        // Error handler
        (err) => {
          console.error('Delete article failed:', err);
          this.isDeleting = false;
          this.router.navigateByUrl('/');
        }
      );
  }
}