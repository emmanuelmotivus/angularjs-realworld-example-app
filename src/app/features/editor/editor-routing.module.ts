import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { EditorComponent } from './editor.component';
import { EditorResolver } from './editor.resolver';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthGuard],
    data: { title: 'Editor' },
    children: [
      {
        // Route for creating a new article (no slug)
        path: '',
        component: EditorComponent,
        canActivate: [AuthGuard]
      },
      {
        // Route for editing an existing article (with slug)
        path: ':slug',
        component: EditorComponent,
        canActivate: [AuthGuard],
        resolve: {
          article: EditorResolver
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EditorResolver]
})
export class EditorRoutingModule {}

/**
 * Editor Routing Module
 * 
 * This module handles routing for the Editor feature:
 * - /editor - Create a new article
 * - /editor/:slug - Edit an existing article
 * 
 * Key implementation details:
 * 1. AuthGuard protects all editor routes, ensuring only authenticated users can access
 * 2. EditorResolver loads the article data when editing an existing article
 *    and verifies the current user is the author
 * 3. The resolver handles redirecting to home if:
 *    - The article doesn't exist
 *    - The current user is not the author
 * 4. Title metadata is preserved from the original configuration
 * 5. Lazy loading is configured at the feature module level
 */