// src/app/core/services/index.ts

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Import all services
import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { ProfileService } from './profile.service';
import { ArticlesService } from './articles.service';
import { CommentsService } from './comments.service';
import { TagsService } from './tags.service';

/**
 * Core Services Module
 * 
 * This module replaces the AngularJS services module 'app.services'.
 * In Angular, we use NgModule to organize related services and provide them
 * to the application. Services are now provided using the providedIn property
 * in their @Injectable decorator or in the providers array of this module.
 * 
 * Note: In modern Angular applications, it's common to use providedIn: 'root'
 * in the @Injectable decorator of each service to make them singleton services
 * available throughout the application. However, we're also registering them
 * in this module to maintain a similar structure to the original AngularJS code.
 */
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UserService,
    JwtService,
    ProfileService,
    ArticlesService,
    CommentsService,
    TagsService
  ]
})
export class ServicesModule { }

// Export all services for direct import in components
export {
  UserService,
  JwtService,
  ProfileService,
  ArticlesService,
  CommentsService,
  TagsService
};