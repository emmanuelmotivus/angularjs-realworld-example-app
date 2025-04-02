import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorComponent } from './editor.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { EditorResolver } from './editor.resolver';

const routes: Routes = [
  {
    path: '',
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
    path: ':slug',
    component: EditorComponent,
    canActivate: [AuthGuard],
    resolve: {
      article: EditorResolver
    },
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