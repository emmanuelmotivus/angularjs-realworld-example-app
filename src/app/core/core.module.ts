import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthInterceptor } from './interceptors/auth.interceptor';

/**
 * Core Module
 * 
 * This module contains singleton services and application-wide providers
 * that should be instantiated only once in the application lifecycle.
 * 
 * The module follows the Angular convention of using a forRoot pattern
 * and throws an error if imported more than once.
 */
@NgModule({
  imports: [
    // Angular modules
    BrowserModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    // HTTP interceptors
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    // Note: User service will be provided in its own service file with providedIn: 'root'
  ]
})
export class CoreModule {
  /**
   * Guard against importing CoreModule more than once
   * @throws Error if CoreModule is imported more than once
   */
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
    }
  }
}