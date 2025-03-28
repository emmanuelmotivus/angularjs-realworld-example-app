import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { TagListComponent } from './components/tag-list/tag-list.component';
import { FeedToggleComponent } from './components/feed-toggle/feed-toggle.component';

// Services
import { HomeService } from './services/home.service';
import { TagsService } from '../../core/services/tags.service';

// Routes
import { HOME_ROUTES } from './home-routing.module';

// Shared components and modules
import { SharedModule } from '../../shared/shared.module';

/**
 * Home Feature Module
 * 
 * This module contains all components related to the home page of the application.
 * It includes:
 * - The main home page component
 * - Article list component for displaying articles
 * - Feed toggle for switching between global and user feeds
 * - Tag list component for displaying and selecting tags
 * 
 * The module is configured for lazy loading through the main app routing module.
 * It imports SharedModule to access common components like article-preview, 
 * pagination, and loading indicators.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    
    // Feature routing
    RouterModule.forChild(HOME_ROUTES),
    
    // Application shared module (contains common components, directives, and pipes)
    SharedModule
  ],
  declarations: [
    // Main page component
    HomeComponent,
    
    // Feature-specific components
    ArticleListComponent,
    TagListComponent,
    FeedToggleComponent
  ],
  providers: [
    // Feature-specific services
    HomeService,
    
    // Services needed by this module but defined in core
    // (They're already provided in CoreModule, but listed here for clarity)
    // TagsService
  ]
})
export class HomeModule { }