import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles/profile-articles.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * ProfileModule is responsible for user profile functionality
 * 
 * This module contains components for:
 * - Displaying user profile information
 * - Showing articles written by a specific user
 * 
 * It uses lazy loading through the ProfileRoutingModule
 */
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ProfileRoutingModule,
    SharedModule
  ],
  declarations: [
    ProfileComponent,
    ProfileArticlesComponent
  ]
})
export class ProfileModule { }