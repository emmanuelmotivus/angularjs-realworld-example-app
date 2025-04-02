import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings-routing.module';

/**
 * Settings Feature Module
 * 
 * This module encapsulates the user settings functionality.
 * It provides the UI for users to update their profile information,
 * change password, and manage account settings.
 * 
 * The module is designed to be lazy-loaded through the routing configuration.
 */
@NgModule({
  imports: [
    // Angular core modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Feature routing module
    SettingsRoutingModule
  ],
  declarations: [
    SettingsComponent
  ]
})
export class SettingsModule { }