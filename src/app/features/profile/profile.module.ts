import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * ProfileModule - Feature module for user profiles
 * 
 * This module encapsulates all functionality related to user profiles:
 * - Profile page component
 * - Profile articles component (showing articles by a specific user)
 * 
 * The module is designed to be lazy-loaded through the main application
 * routing configuration, improving initial load time.
 * 
 * It imports SharedModule to access common components, directives and pipes
 * used across the application.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    RouterModule,
    
    // Feature-specific routing
    ProfileRoutingModule,
    
    // Application shared module (for common components, directives, pipes)
    SharedModule
  ],
  declarations: [
    // Components specific to the profile feature
    ProfileComponent,
    ProfileArticlesComponent
  ],
  // No exports needed as components are only used within this feature module
  // and accessed via routing
})
export class ProfileModule { }