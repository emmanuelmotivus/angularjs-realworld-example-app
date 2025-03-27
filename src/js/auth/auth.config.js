// auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { UserService } from '../services/user.service';

// Converting AngularJS UI-Router states to Angular Router routes
const routes: Routes = [
  {
    path: 'login',
    component: AuthComponent,
    title: 'Sign in',
    resolve: {
      // Converting resolve function to a resolver that checks auth state
      auth: () => {
        return inject(UserService).ensureAuthIs(false);
      }
    }
  },
  {
    path: 'register',
    component: AuthComponent,
    title: 'Sign up',
    resolve: {
      // Converting resolve function to a resolver that checks auth state
      auth: () => {
        return inject(UserService).ensureAuthIs(false);
      }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

// We need to export the routes for the main routing module
export const authRoutes = routes;