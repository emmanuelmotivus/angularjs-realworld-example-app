// article-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticlesService } from '../services/articles.service';

// Routes configuration for the article feature
const routes: Routes = [
  {
    path: 'article/:slug',
    component: ArticleComponent,
    // Angular Router resolve to fetch article data before activating the route
    resolve: {
      article: (articlesService: ArticlesService, route: import('@angular/router').ActivatedRouteSnapshot) => {
        return articlesService.get(route.params['slug'])
          .toPromise()
          .catch(() => {
            // Navigate to home on error
            return import('@angular/router').Router.prototype.navigate(['/']);
          });
      }
    },
    data: {
      title: 'Article'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }