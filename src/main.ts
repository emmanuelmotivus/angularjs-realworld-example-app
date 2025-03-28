import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * This is the main entry point for the Angular application.
 * It replaces the AngularJS bootstrap process from the original app.js
 * 
 * Key migration changes:
 * - Removed all AngularJS module imports and declarations
 * - Replaced angular.bootstrap with Angular's platformBrowserDynamic
 * - Added environment configuration for production mode
 * - All modules are now imported and declared in AppModule instead of here
 * - Removed window.app global reference as it's not needed in Angular
 * - Constants, config and run blocks are now handled in various Angular services and modules
 */

// Enable production mode if we're in production environment
if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application with the root AppModule
// This replaces the angular.bootstrap call from the original AngularJS app
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error('Application initialization failed:', err));

/**
 * Note: The AppModule (in app.module.ts) now imports all the feature modules that
 * were previously imported in the AngularJS app:
 * - LayoutModule (formerly 'app.layout')
 * - SharedModule (formerly 'app.components')
 * - HomeModule (formerly 'app.home')
 * - ProfileModule (formerly 'app.profile')
 * - ArticleModule (formerly 'app.article')
 * - CoreModule (formerly 'app.services')
 * - AuthModule (formerly 'app.auth')
 * - SettingsModule (formerly 'app.settings')
 * - EditorModule (formerly 'app.editor')
 * 
 * The ui-router dependency is replaced with Angular Router
 * The templates are now handled by Angular's component architecture
 * Constants are now provided through environment files or injection tokens
 */