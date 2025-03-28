import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../../../../core/models/article.model';
import { ArticlesService } from '../../../../core/services/articles.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-favorite-button',
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  isSubmitting = false;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  toggleFavorite() {
    this.isSubmitting = true;

    // Check if user is authenticated
    this.userService.isAuthenticated.subscribe(
      (authenticated) => {
        // Not authenticated? Redirect to login
        if (!authenticated) {
          this.router.navigateByUrl('/login');
          return;
        }

        // Favorite the article if it isn't favorited yet
        if (!this.article.favorited) {
          this.articlesService.favorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(true);
              },
              err => this.isSubmitting = false
            );

        // Unfavorite the article if it was favorited
        } else {
          this.articlesService.unfavorite(this.article.slug)
            .subscribe(
              data => {
                this.isSubmitting = false;
                this.toggle.emit(false);
              },
              err => this.isSubmitting = false
            );
        }
      }
    );
  }
}