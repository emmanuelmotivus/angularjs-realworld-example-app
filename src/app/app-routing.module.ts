import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      {
        path: 'register',
        loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)
      },
      // Temporarily commented out routes that depend on missing modules
      /*
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule),
        canActivate: [AuthGuard] // Protect settings route
      },
      {
        path: 'editor',
        loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule),
        canActivate: [AuthGuard] // Protect editor route
      },
      {
        path: 'editor/:slug',
        loadChildren: () => import('./features/editor/editor.module').then(m => m.EditorModule),
        canActivate: [AuthGuard] // Protect editor route with slug parameter
      },
      */
      
      {
        path: 'article',
        loadChildren: () => import('./features/article/article.module').then(m => m.ArticleModule)
      },
      // Temporarily commented out routes that depend on missing modules
      /*
      {
        path: 'profile/:username',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'profile/:username/favorites',
        loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule)
      },
      */
      // Catch-all route for 404 errors
      {
        path: '**',
        redirectTo: ''
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // Use hash location strategy to match the original app's behavior
      // Remove this if you want to use HTML5 routing (PathLocationStrategy)
      useHash: true,
      
      // Enable preloading of all lazy loaded modules for better UX after initial load
      preloadingStrategy: PreloadAllModules,
      
      // Enable route tracing for debugging (remove in production)
      enableTracing: false,
      
      // Scroll to top when navigating to a new route
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }