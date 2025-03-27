// settings-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './settings.component';
import { UserService } from '../core/services/user.service';
import { AuthGuard } from '../core/services/auth-guard.service';

// Routes configuration for settings feature
const routes: Routes = [
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
    data: { title: 'Settings' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }

// AuthGuard implementation is assumed to be in a separate file
// that checks User.ensureAuthIs(true) functionality