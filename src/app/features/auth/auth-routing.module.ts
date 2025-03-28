import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './components/auth.component';
import { NoAuthGuard } from '../../core/guards/no-auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: AuthComponent,
        canActivate: [NoAuthGuard],
        data: {
          title: 'Sign in',
          authType: 'login'
        }
      },
      {
        path: 'register',
        component: AuthComponent,
        canActivate: [NoAuthGuard],
        data: {
          title: 'Sign up',
          authType: 'register'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {}