import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiConfig } from './config/api.config';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';
import { ArticlesService } from './services/articles.service';
import { ProfileService } from './services/profile.service';
import { TagsService } from './services/tags.service';
import { CommentsService } from './services/comments.service';
import { AppConstants } from './services/app-constants.service';

/**
 * CoreModule contains singleton services that are used across the entire application.
 * 
 * Services:
 * - JwtService: Manages JWT token storage and retrieval
 * - UserService: Handles user authentication and user operations
 * - ArticlesService: Provides methods to interact with articles
 * - ProfileService: Manages user profile operations
 * - TagsService: Retrieves tags for articles
 * 
 * Interceptors:
 * - AuthInterceptor: Adds authentication headers to HTTP requests
 */
@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ApiConfig,
    AppConstants,
    JwtService,
    UserService,
    ArticlesService,
    ProfileService,
    TagsService,
    CommentsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class CoreModule { }