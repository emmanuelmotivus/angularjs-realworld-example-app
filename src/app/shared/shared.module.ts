import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { ListErrorsComponent } from './list-errors/list-errors.component';
import { FollowBtnComponent } from './buttons/follow-btn/follow-btn.component';
import { ArticleMetaComponent } from './article-helpers/article-meta/article-meta.component';
import { FavoriteBtnComponent } from './buttons/favorite-btn/favorite-btn.component';
import { ArticlePreviewComponent } from './article-helpers/article-preview/article-preview.component';
import { ArticleListComponent } from './article-helpers/article-list/article-list.component';
import { ListPaginationComponent } from './article-helpers/list-pagination/list-pagination.component';

// Directives
import { ShowAuthedDirective } from './show-authed.directive';

/**
 * SharedModule contains common components, directives, and pipes that are used
 * across multiple feature modules in the application.
 * 
 * This module follows the Angular best practice of creating a shared module
 * for reusable components that can be imported by feature modules.
 */
@NgModule({
  imports: [
    CommonModule // Imported for common directives like *ngIf, *ngFor
  ],
  declarations: [
    // Components
    ListErrorsComponent,
    FollowBtnComponent,
    ArticleMetaComponent,
    FavoriteBtnComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective
  ],
  exports: [
    // Components
    ListErrorsComponent,
    FollowBtnComponent,
    ArticleMetaComponent,
    FavoriteBtnComponent,
    ArticlePreviewComponent,
    ArticleListComponent,
    ListPaginationComponent,
    
    // Directives
    ShowAuthedDirective
  ]
})
export class SharedModule {}