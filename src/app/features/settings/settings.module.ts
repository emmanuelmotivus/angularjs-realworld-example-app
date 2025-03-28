import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Import the settings component (converted from SettingsCtrl)
import { SettingsComponent } from './settings.component';

// Import settings routing module (converted from SettingsConfig)
import { SettingsRoutingModule } from './settings-routing.module';

// Import shared modules that might be needed
import { SharedModule } from '../../shared/shared.module';

/**
 * Settings Feature Module
 * 
 * This module handles the user settings functionality of the application.
 * It's organized as a feature module that can be lazy-loaded through the 
 * Angular router.
 * 
 * Components:
 * - SettingsComponent: Main component for user settings (converted from SettingsCtrl)
 * 
 * Routing:
 * - Routes are defined in SettingsRoutingModule which was converted from SettingsConfig
 * - The main route is typically '/settings' which loads the SettingsComponent
 */
@NgModule({
  imports: [
    // Angular built-in modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    // Feature-specific routing
    SettingsRoutingModule,
    
    // Application shared module (for common components, directives, pipes)
    SharedModule
  ],
  declarations: [
    // Components
    SettingsComponent
  ],
  // No providers here as services should be provided in the core module
  // or with providedIn: 'root' in the service itself
})
export class SettingsModule { }