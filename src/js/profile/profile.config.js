// profile-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile.component';
import { ProfileArticlesComponent } from './profile-articles.component';

// Convert UI-Router states to Angular Router routes
const routes: Routes = [
  {
    path: '@:username',
    component: ProfileComponent,
    // Use route data instead of UI-Router's title property
    data: { title: 'Profile' },
    // Angular Router uses resolve objects differently
    resolve: {
      profile: 'profileResolver' // This will be provided in the module
    },
    children: [
      {
        path: '',
        component: ProfileArticlesComponent,
        data: { title: 'Profile' }
      },
      {
        path: 'favorites',
        component: ProfileArticlesComponent,
        data: { title: 'Favorites' }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    // Define the resolver as a provider
    {
      provide: 'profileResolver',
      useFactory: (profileService, router) => {
        return (route) => {
          return profileService.get