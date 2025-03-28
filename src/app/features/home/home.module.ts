import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HomePageComponent } from './pages/home-page/home-page.component';

// Services
import { TagsService } from '../../core/services/tags.service';

// Routes
import { HomeRoutingModule, HOME_ROUTES } from './home-routing.module';

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
    HomeRoutingModule,
    
    // Application shared module (contains common components, directives, and pipes)
    SharedModule
  ],
  declarations: [
    // Main page component
    HomePageComponent
  ],
  providers: [
    // Feature-specific services
    TagsService
  ]
})
export class HomeModule { }