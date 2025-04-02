import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { NonAuthGuard } from '../../core/guards/non-auth.guard';

const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    canActivate: [NonAuthGuard],
    data: { 
      title: 'Sign in',
      authType: 'login'
    }
  },
  {
    path: 'register',
    component: AuthComponent,
    canActivate: [NonAuthGuard],
    data: { 
      title: 'Sign up',
      authType: 'register'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }