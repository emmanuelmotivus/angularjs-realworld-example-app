import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// App Component
import { AppComponent } from './app.component';

// Feature Modules
import { HomeModule } from './features/home/home.module';
import { AuthModule } from './features/auth/auth.module';
import { SettingsModule } from './features/settings/settings.module';
import { ProfileModule } from './features/profile/profile.module';
import { EditorModule } from './features/editor/editor.module';
import { ArticleModule } from './features/article/article.module';

// Core Module (contains services, interceptors, etc.)
import { CoreModule } from './core/core.module';

// Shared Module (contains shared components, directives, pipes)
import { SharedModule } from './shared/shared.module';

// Layout Module (contains header, footer, etc.)
import { LayoutModule } from './layout/layout.module';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Constants
import { APP_CONSTANTS } from './core/constants';

// HTTP Interceptor
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

/**
 * Main application module that bootstraps Angular application
 * 
 * This module:
 * 1. Imports Angular core modules (BrowserModule, HttpClientModule, RouterModule)
 * 2. Imports feature modules (Home, Auth, Settings, etc.)
 * 3. Imports core module with application-wide services
 * 4. Imports shared module with reusable components
 * 5. Configures HTTP interceptors for authentication
 * 6. Provides application constants
 * 7. Bootstraps the main AppComponent
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular Core Modules
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // App Routing Module
    AppRoutingModule,
    
    // Core Module - contains services, interceptors, etc.
    CoreModule,
    
    // Shared Module - contains shared components, directives, pipes
    SharedModule,
    
    // Layout Module - contains header, footer, etc.
    LayoutModule,
    
    // Feature Modules
    HomeModule,
    AuthModule,
    SettingsModule,
    ProfileModule,
    EditorModule,
    ArticleModule
  ],
  providers: [
    // Application Constants
    { provide: 'AppConstants', useValue: APP_CONSTANTS },
    
    // HTTP Interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }