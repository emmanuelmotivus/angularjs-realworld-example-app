import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { ListErrorsComponent } from './components/list-errors/list-errors.component';
import { FollowButtonComponent } from './components/buttons/follow-button/follow-button.component';
import { ArticleMetaComponent } from './components/article-helpers/article-meta/article-meta.component';
import { FavoriteButtonComponent } from './components/buttons/favorite-button/favorite-button.component';
import { ArticlePreviewComponent } from './components/article-helpers/article-preview/article-preview.component';
import { ArticleListComponent } from './components/article-helpers/article-list/article-list.component';
import { ListPaginationComponent } from './components/article-helpers/list-pagination/list-pagination.component';

// Directives
import { ShowAuthedDirective } from './directives/show-authed.directive';

// Pipes
import { MarkdownPipe } from './pipes/markdown.pipe';

/**
 * SharedModule contains common components, directives, and pipes that are used
 * across multiple feature modules in the application.
 * 
 * This module follows the Angular best practice of creating a SharedModule that:
 * 1. Contains components, directives, and pipes that are used in multiple feature modules
 * 2. Exports all of its declarations so they can be used by any module that imports SharedModule
 * 3. Imports CommonModule which provides common directives like ngIf and ngFor
 * 4. Imports RouterModule for components that need router directives like routerLink
 * 
 * Components migrated from AngularJS:
 * - list-errors: Displays form validation errors
 * - follow-button: Button to follow/unfollow users
 * - article-meta: Displays article metadata (author, date, etc.)
 * - favorite-button: Button to favorite/unfavorite articles
 * - article-preview: Displays a preview of an article
 * - article-list: Displays a list of article previews
 * - list-pagination: Pagination controls for article lists
 * 
 * Directives migrated from AngularJS:
 * - show-authed: Conditionally shows/hides elements based on authentication status
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    // Components
    ListErrorsComponent,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective,
    
    // Pipes
    MarkdownPipe
  ],
  exports: [
    // Re-export Angular modules
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Components
    ListErrorsComponent,
    FollowButtonComponent,
    ArticleMetaComponent,
    FavoriteButtonComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective,
    
    // Pipes
    MarkdownPipe
  ]
})
export class SharedModule {}