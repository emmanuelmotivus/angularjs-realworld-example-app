import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { UserService } from '../../../core/services/user.service';
import { ArticlesService } from '../../../core/services/articles.service';
import { Article } from '../../../core/models/article.model';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent implements OnInit {
  /**
   * The article to toggle favorite status for
   * Converted from AngularJS '=' binding to Angular @Input()
   */
  @Input() article: Article;
  
  /**
   * Tracks the submission state to disable the button during API calls
   */
  isSubmitting = false;

  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit() {
    // No initialization needed, but implementing OnInit for consistency
    // and potential future initialization logic
  }

  /**
   * Toggles the favorite status of the article
   * Converted from AngularJS promise-based implementation to RxJS observables
   * with proper error handling and loading state management
   */
  submit() {
    this.isSubmitting = true;

    // Check if user is authenticated
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    // Toggle favorite status
    const action = this.article.favorited ? 
      this.articlesService.unfavorite(this.article.slug) :
      this.articlesService.favorite(this.article.slug);

    action.pipe(
      // Always set isSubmitting to false when complete
      finalize(() => {
        this.isSubmitting = false;
      })
    ).subscribe(
      // Success handler
      () => {
        if (this.article.favorited) {
          this.article.favorited = false;
          this.article.favoritesCount--;
        } else {
          this.article.favorited = true;
          this.article.favoritesCount++;
        }
      },
      // Error handler
      err => {
        console.error('Error toggling favorite status', err);
        // Optionally implement error notification here
      }
    );
  }
}