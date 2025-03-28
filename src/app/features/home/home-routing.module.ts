import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';

export const HOME_ROUTES: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: {
      title: 'Home'
    }
    // Note: If there were any resolves in the original config,
    // they would be implemented as route resolvers here
  }
];

@NgModule({
  imports: [RouterModule.forChild(HOME_ROUTES)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }