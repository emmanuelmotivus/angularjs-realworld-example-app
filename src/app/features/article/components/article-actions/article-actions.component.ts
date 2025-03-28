import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

import { Article } from '../../../../core/models/article.model';
import { User } from '../../../../core/models/user.model';
import { ArticlesService } from '../../../../core/services/articles.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-article-actions',
  templateUrl: './article-actions.component.html'
})
export class ArticleActionsComponent implements OnInit {
  @Input() article!: Article;
  @Output() toggle = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();

  canModify: boolean = false;
  isDeleting: boolean = false;

  constructor(
    private articlesService: ArticlesService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Determine if the current user is the author of this article
    this.userService.currentUser.subscribe(
      (userData: User | null) => {
        this.canModify = userData !== null && userData.username === this.article.author.username;
      }
    );
  }

  deleteArticle() {
    this.isDeleting = true;
    
    this.articlesService.deleteArticle(this.article.slug)
      .subscribe(
        success => {
          this.router.navigateByUrl('/');
        },
        err => {
          this.isDeleting = false;
        }
      );
  }
  
  onToggleFollowing(following: boolean) {
    // Emit the toggle event to the parent component
    this.toggle.emit(following);
  }
  
  onToggleFavorite(favorited: boolean) {
    // Emit the toggle event to the parent component
    this.toggle.emit(favorited);
  }
}
