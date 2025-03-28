import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ApiConfig } from '../config/api.config';
import { Article } from '../models/article.model';
import { MockArticlesService } from './mock/mock-articles.service';

export interface ArticleResponse {
  article: Article;
}

export interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export interface ArticleQueryConfig {
  limit?: number;
  offset?: number;
  filters?: {
    tag?: string;
    author?: string;
    favorited?: string;
    limit?: number;
    offset?: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig,
    private mockArticlesService: MockArticlesService
  ) {}

  /**
   * Get all articles (globally)
   * @param config Configuration object for the query
   * @returns Observable of articles response
   */
  getAll(config: ArticleQueryConfig): Observable<ArticlesResponse> {
    console.log('ArticlesService.getAll called with config:', config);
    
    // Use mock data instead of HTTP request
    const mockResponse = this.mockArticlesService.getArticles(
      config.limit, 
      config.offset, 
      config.filters
    );
    
    return of(mockResponse);
    
    /* Original HTTP implementation
    // Convert filters to HttpParams if they exist
    let params = new HttpParams();
    
    // Set limit and offset
    if (config.limit) {
      params = params.set('limit', config.limit.toString());
    }
    if (config.offset !== undefined) {
      params = params.set('offset', config.offset.toString());
    }
    
    // Add any filters
    if (config.filters) {
      Object.keys(config.filters).forEach(key => {
        const value = config.filters?.[key as keyof typeof config.filters];
        if (value !== undefined) {
          params = params.set(key, value.toString());
        }
      });
    }

    // Return the HTTP request as an Observable
    return this.http.get<ArticlesResponse>(
      this.apiConfig.articles.list,
      { params }
    ).pipe(
      catchError(err => throwError(() => new Error(err.message || 'Failed to fetch articles')))
    );
    */
  }

  /**
   * Get feed articles (for authenticated users)
   * @param config Configuration object for the query
   * @returns Observable of articles response
   */
  getFeed(config: ArticleQueryConfig): Observable<ArticlesResponse> {
    console.log('ArticlesService.getFeed called with config:', config);
    
    // For mock data, we'll return the same articles since we don't have a real feed
    // In a real app, this would filter to show only articles from followed users
    const mockResponse = this.mockArticlesService.getArticles(
      config.limit, 
      config.offset
    );
    
    return of(mockResponse);
    
    /* Original HTTP implementation
    // Convert filters to HttpParams if they exist
    let params = new HttpParams();
    
    // Set limit and offset
    if (config.limit) {
      params = params.set('limit', config.limit.toString());
    }
    if (config.offset !== undefined) {
      params = params.set('offset', config.offset.toString());
    }

    // Return the HTTP request as an Observable
    return this.http.get<ArticlesResponse>(
      this.apiConfig.articles.feed,
      { params }
    ).pipe(
      catchError(err => throwError(() => new Error(err.message || 'Failed to fetch feed')))
    );
    */
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

    return this.http.get<ArticleResponse>(this.apiConfig.articles.get(slug))
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
    return this.http.delete(this.apiConfig.articles.delete(slug))
      .pipe(
        catchError(err => throwError(() => new Error(err.message || 'Failed to delete article')))
      );
  }

  /**
   * Create a new article
   * @param article The article to create
   * @returns Observable of the saved article
   */
  create(article: Partial<Article>): Observable<Article> {
    return this.http.post<ArticleResponse>(
      this.apiConfig.articles.create,
      { article }
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => new Error(err.message || 'Failed to create article')))
    );
  }

  /**
   * Update an existing article
   * @param article The article to update
   * @returns Observable of the updated article
   */
  update(slug: string, article: Partial<Article>): Observable<Article> {
    return this.http.put<ArticleResponse>(
      this.apiConfig.articles.update(slug),
      { article }
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => new Error(err.message || 'Failed to update article')))
    );
  }

  /**
   * Favorite an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  favorite(slug: string): Observable<Article> {
    return this.http.post<ArticleResponse>(
      this.apiConfig.articles.favorite(slug),
      {}
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => new Error(err.message || 'Failed to favorite article')))
    );
  }

  /**
   * Unfavorite an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  unfavorite(slug: string): Observable<Article> {
    return this.http.delete<ArticleResponse>(
      this.apiConfig.articles.unfavorite(slug)
    ).pipe(
      map(response => response.article),
      catchError(err => throwError(() => new Error(err.message || 'Failed to unfavorite article')))
    );
  }

  /**
   * Delete an article
   * @param slug The article slug
   * @returns Observable of the HTTP response
   */
  deleteArticle(slug: string): Observable<any> {
    return this.destroy(slug);
  }
}