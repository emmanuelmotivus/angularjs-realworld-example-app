import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Routing
import { ArticleRoutingModule } from './article-routing.module';

// Components
import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ArticleActionsComponent } from './components/article-actions/article-actions.component';
import { CommentComponent } from './components/comment/comment.component';

// Services
import { ArticlesService } from '../../core/services/articles.service';
import { CommentsService } from '../../core/services/comments.service';

// Shared module (for components like article-meta, favorite-button, etc.)
import { SharedModule } from '../../shared/shared.module';

/**
 * ArticleModule contains all components and services related to the article feature.
 * 
 * This module is responsible for:
 * - Displaying a single article
 * - Showing article comments
 * - Article actions (edit, delete, favorite)
 * - Comment actions (add, delete)
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    FormsModule,
    
    // Feature routing
    ArticleRoutingModule,
    
    // Shared module for common components
    SharedModule
  ],
  declarations: [
    // Page component
    ArticlePageComponent,
    
    // Feature-specific components
    ArticleActionsComponent,
    CommentComponent
  ],
  providers: [
    // These services are already provided in CoreModule,
    // but listed here for clarity on dependencies
    ArticlesService,
    CommentsService
  ]
})
export class ArticleModule { }
