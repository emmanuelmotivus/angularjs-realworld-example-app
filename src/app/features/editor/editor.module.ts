import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { SharedModule } from '../../shared/shared.module';

/**
 * Editor Feature Module
 * 
 * This module encapsulates the article editor functionality, allowing users to create
 * and edit articles. It includes the editor component and necessary form handling.
 * 
 * The module is designed to be lazy-loaded through the routing configuration.
 */
@NgModule({
  declarations: [
    EditorComponent
  ],
  imports: [
    CommonModule, // For common directives like ngIf, ngFor
    FormsModule, // For template-driven forms
    ReactiveFormsModule, // For reactive forms
    EditorRoutingModule, // Feature-specific routing
    SharedModule // For shared components, directives, and pipes
  ]
})
export class EditorModule { }