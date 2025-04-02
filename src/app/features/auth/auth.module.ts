import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth-routing.module';

/**
 * Authentication Feature Module
 * 
 * This module handles user authentication functionality including:
 * - Login
 * - Registration
 * - Authentication state management
 * 
 * It's designed as a feature module that can be lazy-loaded
 * through the AuthRoutingModule configuration.
 */
@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }