import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

// Import the services and models
// Note: These imports assume the services and models have been migrated
import { UserService } from '../../../../core/services/user.service';
import { ArticlesService } from '../../../../core/services/articles.service';
import { Article } from '../../../../core/models/article.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html',
  styleUrls: ['./favorite-button.component.scss']
})
export class FavoriteButtonComponent implements OnInit {
  // Convert AngularJS '=' binding to Angular @Input()
  // Using one-way binding in Angular with proper type
  @Input() article!: Article;
  
  // Track submission state
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Initialize component if needed
    // Angular's ngOnInit replaces AngularJS $onInit
  }

  /**
   * Handle favorite/unfavorite action
   * - Checks if user is logged in, redirects to register if not
   * - Toggles favorite status and updates count
   * - Uses RxJS operators for proper async handling
   */
  submit(): void {
    this.isSubmitting = true;

    // Check if user is logged in
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // Determine if we need to favorite or unfavorite
    if (this.article.favorited) {
      // Unfavorite the article
      this.articlesService.unfavorite(this.article.slug)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.article.favorited = false;
            this.article.favoritesCount--;
          },
          err => {
            // Error handling
            console.error('Error unfavoriting article', err);
          }
        );
    } else {
      // Favorite the article
      this.articlesService.favorite(this.article.slug)
        .pipe(
          finalize(() => {
            this.isSubmitting = false;
          })
        )
        .subscribe(
          () => {
            this.article.favorited = true;
            this.article.favoritesCount++;
          },
          err => {
            // Error handling
            console.error('Error favoriting article', err);
          }
        );
    }
  }
}