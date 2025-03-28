import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { ArticleComponent } from './pages/article/article.component';
import { ArticleActionsComponent } from './components/article-actions/article-actions.component';
import { CommentComponent } from './components/comment/comment.component';

// Services
import { ArticleService } from '../../core/services/article.service';
import { CommentsService } from '../../core/services/comments.service';
import { UserService } from '../../core/services/user.service';

// Routing
import { ArticleRoutingModule } from './article-routing.module';

/**
 * Feature module for the Article functionality
 * 
 * This module contains components related to viewing an article, including:
 * - The main article page component
 * - Article actions (edit, delete, favorite)
 * - Comment components for displaying and adding comments
 * 
 * The module is configured for lazy loading through the ArticleRoutingModule
 * which defines the routes for viewing individual articles.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    
    // Feature routing module
    ArticleRoutingModule
  ],
  declarations: [
    // Page components
    ArticleComponent, // Converted from ArticleCtrl
    
    // Feature components
    ArticleActionsComponent,
    CommentComponent
  ],
  providers: [
    // Any article-specific services would go here
    // Core services are provided in CoreModule
  ],
  exports: [
    // Export components that might be used in other modules
    ArticleActionsComponent,
    CommentComponent
  ]
})
export class ArticleModule { }