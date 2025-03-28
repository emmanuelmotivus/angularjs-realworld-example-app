import { NgModule } from '@angular/core';
import { RouterModule, Routes, Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ArticleComponent } from './article.component';
import { ArticlesService } from '../../core/services/articles.service';
import { Article } from '../../core/models/article.model';

/**
 * Resolver to fetch article data before navigating to the article page
 * This replaces the AngularJS resolve functionality
 */
@Injectable({ providedIn: 'root' })
export class ArticleResolver implements Resolve<Article> {
  constructor(
    private articlesService: ArticlesService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Article> {
    const slug = route.paramMap.get('slug');
    
    // Return the article data or redirect to home if article not found
    return this.articlesService.get(slug).pipe(
      catchError(() => {
        this.router.navigateByUrl('/');
        return of(null);
      })
    );
  }
}

// Define the routes for the article feature module
const routes: Routes = [
  {
    path: ':slug',
    component: ArticleComponent,
    resolve: {
      article: ArticleResolver
    },
    data: { 
      title: 'Article'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ArticleResolver]
})
export class ArticleRoutingModule {}