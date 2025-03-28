import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';

import { ArticlePageComponent } from './pages/article-page/article-page.component';
import { ArticlesService } from '../../core/services/articles.service';
import { Article } from '../../core/models/article.model';

// Resolver to pre-fetch article data
@Injectable()
export class ArticleResolver implements Resolve<Article> {
  constructor(private articlesService: ArticlesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    const slug = route.paramMap.get('slug');
    
    if (!slug) {
      throw new Error('Article slug is required');
    }
    
    return this.articlesService.get(slug);
  }
}

const routes: Routes = [
  {
    path: ':slug',
    component: ArticlePageComponent,
    resolve: {
      article: ArticleResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArticleResolver]
})
export class ArticleRoutingModule { }
