import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditorRoutingModule } from './editor-routing.module';
import { SharedModule } from '../../shared/shared.module';

/**
 * Editor Feature Module
 * 
 * This module encapsulates the article editor functionality, which was previously
 * managed by the AngularJS EditorCtrl controller and related components.
 * 
 * Features:
 * - Article creation and editing
 * - Form validation
 * - Tag management
 * 
 * The module is configured for lazy loading through the EditorRoutingModule,
 * which defines the routes for creating new articles and editing existing ones.
 */
@NgModule({
  imports: [
    // Angular core modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    
    // Feature-specific routing
    EditorRoutingModule,
    
    // Shared components, directives, and pipes
    SharedModule
  ],
  declarations: [
    // Components
    EditorComponent
  ],
  // No providers are defined at the module level as services should be provided in the core module
  // or with providedIn: 'root' for application-wide singleton services
})
export class EditorModule { }