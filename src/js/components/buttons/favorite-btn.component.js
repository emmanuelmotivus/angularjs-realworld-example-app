// favorite-btn.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ArticlesService } from '../../services/articles.service';

@Component({
  selector: 'app-favorite-btn',
  templateUrl: './favorite-btn.component.html'
})
export class FavoriteBtnComponent {
  // Input decorator replaces the bindings property from AngularJS
  @Input() article: any;
  
  // Flag to track submission state
  isSubmitting = false;

  // Constructor injection replaces 'ngInject' from AngularJS
  constructor(
    private userService: UserService,
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  submit() {
    this.isSubmitting = true;

    // Check if user is authenticated
    if (!this.userService.getCurrentUser()) {
      this.router.navigateByUrl('/register');
      return;
    }

    if (this.article.favorited) {
      this.articlesService.unfavorite(this.article.slug).subscribe(
        () => {
          this.isSubmitting = false;
          this.article.favorited = false;
          this.article.favoritesCount--;
        }
      );
    } else {
      this.articlesService.favorite(this.article.slug).subscribe(
        () => {
          this.isSubmitting = false;
          this.article.favorited = true;
          this.article.favoritesCount++;
        }
      );
    }
  }
}