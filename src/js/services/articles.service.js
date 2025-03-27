// Import necessary Angular dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Use @Injectable decorator to make this service available for dependency injection
@Injectable({
  providedIn: 'root' // This makes the service available as a singleton throughout the app
})
export class ArticlesService {
  constructor(
    private appConstants: any, // Replace with proper type when AppConstants is upgraded
    private http: HttpClient
  ) {}

  /*
    Config object spec:

    {
      type: String [REQUIRED] - Accepts "all", "feed"
      filters: Object that serves as a key => value of URL params (i.e. {author:"ericsimons"} )
    }
  */
  query(config): Observable<any> {
    // Create the URL for this request
    const url = this.appConstants.api + '/articles' + ((config.type === 'feed') ? '/feed' : '');
    
    // Set up params if filters exist
    let params = new HttpParams();
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        params = params.set(key, config.filters[key]);
      });
    }

    // Return the Observable directly
    return this.http.get(url, { params }).pipe(
      // Map to extract just the data property
      map(response => response)
    );
  }

  get(slug: string): Observable<any> {
    // Validate slug and return error Observable if empty
    if (!slug.replace(" ", "")) {
      return throwError("Article slug is empty");
    }

    // Return the Observable with proper error handling
    return this.http.get(`${this.appConstants.api}/articles/${slug}`).pipe(
      map(response => response['article']),
      catchError(err => throwError(err))
    );
  }

  destroy(slug: string): Observable<any> {
    return this.http.delete(`${this.appConstants.api}/articles/${slug}`);
  }

  save(article: any): Observable<any> {
    let url = this.appConstants.api + '/articles';
    let method = 'post';

    if (article.slug) {
      url = `${this.appConstants.api}/articles/${article.slug}`;
      method = 'put';
      // Create a copy to avoid modifying the original object
      const articleCopy = { ...article };
      delete articleCopy.slug;
      article = articleCopy;
    }

    // Use the appropriate HTTP method based on whether we're creating or updating
    return (method === 'post' ? 
      this.http.post(url, { article }) : 
      this.http.put(url, { article })
    ).pipe(
      map(response => response['article'])
    );
  }

  favorite(slug: string): Observable<any> {
    return this.http.post(
      `${this.appConstants.api}/articles/${slug}/favorite`, 
      {}
    );
  }

  unfavorite(slug: string): Observable<any> {
    return this.http.delete(
      `${this.appConstants.api}/articles/${slug}/favorite`
    );
  }
}