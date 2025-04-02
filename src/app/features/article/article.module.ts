import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ArticleComponent } from './article.component';
import { ArticleActionsComponent } from './article-actions/article-actions.component';
import { CommentComponent } from './comment/comment.component';
import { ArticleRoutingModule } from './article-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Feature module for article functionality
 * 
 * This module contains components related to viewing an article:
 * - ArticleComponent: Main container component for article view
 * - ArticleActionsComponent: Handles article-specific actions (favorite, follow, etc.)
 * - CommentComponent: Displays and manages article comments
 * 
 * The module is designed to be lazy-loaded through the routing configuration
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ArticleRoutingModule,
    SharedModule
  ],
  declarations: [
    ArticleComponent,
    ArticleActionsComponent,
    CommentComponent
  ]
})
export class ArticleModule { }