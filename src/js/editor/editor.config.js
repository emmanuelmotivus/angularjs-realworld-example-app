// editor-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { EditorResolver } from './editor.resolver';

const routes: Routes = [
  {
    path: 'editor/:slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditorResolver
    },
    data: {
      title: 'Editor'
    }
  },
  {
    path: 'editor',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Editor'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }

// This file replaces the old AngularJS UI-Router configuration with Angular Router
// Key changes:
// 1. Converted UI-Router state to Angular Router routes
// 2. Replaced 'auth' resolve with AuthGuard canActivate
// 3. Moved article resolver logic to a separate EditorResolver service
// 4. Added title in route data instead of directly in the state config
// 5. Created proper Angular module structure with NgModule decorator