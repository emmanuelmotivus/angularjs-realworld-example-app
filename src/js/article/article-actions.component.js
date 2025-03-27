// article-actions.component.ts
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ArticlesService } from '../services/articles.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html' // Path may need adjustment based on project structure
})
export class ArticleActionsComponent {
  // Changed from binding to @Input decorator
  @Input() article: any;
  
  // Added property declarations
  canModify: boolean = false;
  isDeleting: boolean = false;

  constructor(
    // Injecting Angular services instead of AngularJS services
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  // Added Angular lifecycle hook to replace constructor logic
  ngOnInit() {
    // Check if current user can modify the article
    this.userService.currentUser.subscribe(
      (userData) => {
        this.canModify = userData && 
          this.article && 
          userData.username === this.article.author.username;
      }
    );
  }

  deleteArticle() {
    this.isDeleting = true;
    
    // Using Angular service instead of AngularJS service
    this.articlesService.destroy(this.article.slug)
      .subscribe(
        // Using Angular Router instead of $state
        () => this.router.navigateByUrl('/'),
        (err) => this.router.navigateByUrl('/')
      );
  }
}