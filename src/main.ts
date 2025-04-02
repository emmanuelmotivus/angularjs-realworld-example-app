import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * This is the main entry point for the Angular application.
 * It replaces the AngularJS bootstrap process with Angular's platformBrowserDynamic.
 * 
 * Key migration changes:
 * - Removed direct angular.bootstrap call in favor of platformBrowserDynamic
 * - Removed all AngularJS module imports and declarations
 * - Module imports are now handled in AppModule and feature modules
 * - Constants are now provided through environment or DI system
 * - Strict DI is enabled by default in Angular's AOT compilation
 */

if (environment.production) {
  enableProdMode();
}

// Bootstrap the Angular application with the root AppModule
// This replaces the AngularJS angular.bootstrap(document, ['app'], { strictDi: true })
platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    // Preserves strictDi behavior from the original AngularJS app
    // Angular uses AOT compilation which enforces strict DI by default
  })
  .catch(err => console.error('Application bootstrap failed:', err));

/**
 * Note: The following modules from the AngularJS app are now imported in their respective Angular modules:
 * - 'ui.router' -> Angular Router (@angular/router) in app-routing.module.ts
 * - 'templates' -> Angular now bundles templates with components
 * - 'app.layout' -> Layout components in layout module
 * - 'app.components' -> Shared components in shared module
 * - 'app.home', 'app.profile', 'app.article', etc. -> Feature modules in the features directory
 * - 'app.services' -> Services in core module or feature modules
 * - 'app.auth' -> Auth module and services in core/auth
 * - Constants are now in environment.ts or provided through DI
 */