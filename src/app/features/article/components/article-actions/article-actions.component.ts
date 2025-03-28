import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticlesService } from '../../../../core/services/articles.service';
import { UserService } from '../../../../core/services/user.service';
import { Article } from '../../../../core/models/article.model';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html'
})
export class ArticleActionsComponent implements OnInit {
  // Convert the two-way binding '=' to an Angular @Input property
  @Input() article: Article;
  
  // Properties
  canModify: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    // Check if the current user is the author of the article
    // This replaces the constructor logic from the AngularJS component
    const currentUser = this.userService.getCurrentUser();
    
    if (currentUser) {
      this.canModify = (currentUser.username === this.article.author.username);
    } else {
      this.canModify = false;
    }
  }

  deleteArticle() {
    this.isDeleting = true;
    
    // Convert promise-based API to Observable with RxJS
    this.articlesService.deleteArticle(this.article.slug)
      .pipe(
        // Use finalize to handle cleanup regardless of success/error
        finalize(() => {
          this.isDeleting = false;
        })
      )
      .subscribe(
        // Success callback
        () => {
          this.router.navigateByUrl('/');
        },
        // Error callback
        (err) => {
          // Log the error but still navigate home
          console.error('Error deleting article', err);
          this.router.navigateByUrl('/');
        }
      );
  }
}