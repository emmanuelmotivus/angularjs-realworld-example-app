import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

// Define interfaces for type safety
export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList?: string[];
  createdAt?: string;
  updatedAt?: string;
  favorited?: boolean;
  favoritesCount?: number;
  author?: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ArticleResponse {
  article: Article;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleQueryConfig {
  type: 'all' | 'feed';
  filters?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  };
}

@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class ArticlesService {
  private apiUrl = environment.api_url; // Using Angular environment instead of AppConstants

  constructor(private http: HttpClient) {}

  /**
   * Query articles based on type and filters
   * @param config Configuration object for the query
   * @returns Observable of articles response
   */
  query(config: ArticleQueryConfig): Observable<ArticlesResponse> {
    // Determine the endpoint based on the type
    const endpoint = config.type === 'feed' ? '/articles/feed' : '/articles';
    
    // Convert filters to HttpParams if they exist
    let params = new HttpParams();
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        const value = config.filters[key];
        if (value !== undefined) {
          params = params.set(key, value.toString());
        }
      });
    }

    // Return the HTTP request as an Observable
    return this.http.get<ArticlesResponse>(`${this.apiUrl}${endpoint}`, { params })
      .pipe(
        catchError(err => throwError(() => new Error(err.message || 'Failed to fetch articles')))
      );
  }

  /**
   * Get a single article by slug
   * @param slug The article slug
   * @returns Observable of the article
   */
  get(slug: string): Observable<Article> {
    // Validate slug before making the request
    if (!slug || slug.trim() === '') {
      return throwError(() => new Error('Article slug is empty'));
    }

    return this.http.get<ArticleResponse>(`${this.apiUrl}/articles/${slug}`)
      .pipe(
        map(response => response.article),
        catchError(err => throwError(() => new Error(err.message || 'Failed to get article')))
      );
  }

  /**
   * Delete an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  destroy(slug: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/articles/${slug}`)
      .pipe(
        catchError(err => throwError(() => new Error(err.message || 'Failed to delete article')))
      );
  }

  /**
   * Save an article (create or update)
   * @param article The article to save
   * @returns Observable of the saved article
   */
  save(article: Article): Observable<Article> {
    let url = `${this.apiUrl}/articles`;
    let method: 'post' | 'put' = 'post';
    
    // If article has a slug, it's an update operation
    if (article.slug) {
      url = `${this.apiUrl}/articles/${article.slug}`;
      method = 'put';
      
      // Create a copy to avoid modifying the original object
      const articleCopy = { ...article };
      delete articleCopy.slug;
      article = articleCopy;
    }

    // Use the appropriate HTTP method
    return (method === 'post' 
      ? this.http.post<ArticleResponse>(url, { article })
      : this.http.put<ArticleResponse>(url, { article })
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => new Error(err.message || 'Failed to save article')))
    );
  }

  /**
   * Favorite an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  favorite(slug: string): Observable<ArticleResponse> {
    return this.http.post<ArticleResponse>(`${this.apiUrl}/articles/${slug}/favorite`, {})
      .pipe(
        catchError(err => throwError(() => new Error(err.message || 'Failed to favorite article')))
      );
  }

  /**
   * Unfavorite an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  unfavorite(slug: string): Observable<ArticleResponse> {
    return this.http.delete<ArticleResponse>(`${this.apiUrl}/articles/${slug}/favorite`)
      .pipe(
        catchError(err => throwError(() => new Error(err.message || 'Failed to unfavorite article')))
      );
  }
}