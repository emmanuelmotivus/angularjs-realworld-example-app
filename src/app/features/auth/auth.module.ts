import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Auth Feature Module
 * 
 * This module handles user authentication functionality including:
 * - Login
 * - Registration
 * - Authentication state management
 * 
 * The module is configured for lazy loading through the AuthRoutingModule.
 * It imports SharedModule for access to common components and directives.
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Feature-specific routing
    AuthRoutingModule,
    
    // Application shared module (for common components, directives, pipes)
    SharedModule
  ],
  declarations: [
    // Components
    AuthComponent
  ],
  providers: [
    // Auth-specific services would be provided here if not already in CoreModule
    // Note: AuthService is likely provided in CoreModule for app-wide access
  ]
})
export class AuthModule { }