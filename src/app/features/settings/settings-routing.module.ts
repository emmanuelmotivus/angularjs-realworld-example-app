import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { SettingsComponent } from './settings.component';

/**
 * Routes for the Settings feature module
 * 
 * The original AngularJS route:
 * - URL: /settings
 * - Controller: SettingsCtrl
 * - Template: settings/settings.html
 * - Required authentication via User.ensureAuthIs(true)
 */
const routes: Routes = [
  {
    path: '',
    component: SettingsComponent,
    canActivate: [AuthGuard], // Replaces the auth resolve function
    data: {
      title: 'Settings', // Preserves the title from the original config
      requiresAuth: true // Used by AuthGuard to determine if authentication is required
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }