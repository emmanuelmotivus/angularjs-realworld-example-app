import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './features/home/home.module';
import { AuthModule } from './features/auth/auth.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AppConstants } from './core/config/app.constants';

/**
 * Main application module that bootstraps the Angular application.
 * 
 * This module:
 * - Imports core Angular modules (BrowserModule, HttpClientModule)
 * - Imports the application routing module
 * - Imports core services and shared components
 * - Configures global HTTP interceptors
 * - Imports eagerly loaded feature modules
 * 
 * Feature modules like Profile, Article, Settings, and Editor are lazy-loaded
 * through the AppRoutingModule configuration.
 */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    // Angular core modules
    BrowserModule,
    HttpClientModule,
    RouterModule,
    
    // App routing
    AppRoutingModule,
    
    // Core functionality and shared components
    CoreModule,
    SharedModule,
    
    // Eagerly loaded feature modules
    HomeModule,
    AuthModule
  ],
  providers: [
    { provide: 'AppConstants', useValue: AppConstants },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }