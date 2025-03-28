import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';

import { Article } from '../../../../core/models/article.model';
import { Comment } from '../../../../core/models/comment.model';
import { User } from '../../../../core/models/user.model';
import { ArticlesService } from '../../../../core/services/articles.service';
import { CommentsService } from '../../../../core/services/comments.service';
import { UserService } from '../../../../core/services/user.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html'
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  article!: Article;
  currentUser: User | null = null;
  comments: Comment[] = [];
  canModify = false;
  isSubmitting = false;
  isDeleting = false;
  commentBody = '';
  commentFormErrors: any = {};
  
  private subscriptions: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Retrieve the prefetched article
    this.route.data.subscribe(
      (data: any) => {
        this.article = data.article;

        // Load the comments on this article
        this.populateComments();
      }
    );

    // Load the current user's data
    this.subscriptions.add(
      this.userService.currentUser.subscribe(
        (userData: User | null) => {
          this.currentUser = userData;

          // Check if the current user is the author of this article
          this.canModify = (this.currentUser?.username === this.article?.author.username);
        }
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  populateComments() {
    this.commentsService.getAll(this.article.slug)
      .subscribe(comments => {
        this.comments = comments;
      });
  }

  addComment() {
    this.isSubmitting = true;
    this.commentFormErrors = {};

    this.commentsService
      .add(this.article.slug, this.commentBody)
      .subscribe(
        comment => {
          this.comments.unshift(comment);
          this.commentBody = '';
          this.isSubmitting = false;
        },
        errors => {
          this.isSubmitting = false;
          this.commentFormErrors = errors;
        }
      );
  }

  deleteComment(comment: Comment) {
    this.commentsService.delete(this.article.slug, comment.id)
      .subscribe(
        () => {
          this.comments = this.comments.filter((item) => item.id !== comment.id);
        }
      );
  }

  deleteArticle() {
    this.isDeleting = true;

    this.articlesService.deleteArticle(this.article.slug)
      .subscribe(
        () => {
          this.router.navigateByUrl('/');
        }
      );
  }
  
  onToggleFollowing(following: boolean) {
    this.article.author.following = following;
  }
  
  onToggleFavorite(favorited: boolean) {
    this.article.favorited = favorited;
    if (favorited) {
      this.article.favoritesCount++;
    } else {
      this.article.favoritesCount--;
    }
  }
}
