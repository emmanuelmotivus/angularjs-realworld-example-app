import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Services
import { ApiService } from './services/api.service';
import { JwtService } from './services/jwt.service';
import { UserService } from './services/user.service';
import { ArticlesService } from './services/articles.service';
import { CommentsService } from './services/comments.service';
import { ProfileService } from './services/profile.service';
import { TagsService } from './services/tags.service';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * CoreModule
 * 
 * This module contains all singleton services that should be instantiated only once in the application.
 * It includes HTTP interceptors, authentication services, and other core functionality.
 * 
 * The module uses the forRoot pattern to ensure it's only imported in the AppModule.
 */
@NgModule({
  imports: [
    // Angular modules
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    // Core services
    ApiService,
    JwtService,
    UserService,
    ArticlesService,
    CommentsService,
    ProfileService,
    TagsService,
    
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  exports: [
    // Re-export modules that components in other feature modules might need
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class CoreModule {
  /**
   * Constructor with guard against reimport
   * 
   * Ensures that CoreModule is only imported in the AppModule
   * and throws an error if it's imported elsewhere
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only');
    }
  }

  /**
   * Use this method in the AppModule to ensure CoreModule is only imported once
   */
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [
        // Providers that should be singletons throughout the application
      ]
    };
  }
}