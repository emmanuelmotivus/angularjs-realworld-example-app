import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * API Configuration Service
 * 
 * This service provides configuration for API endpoints
 */
@Injectable({
  providedIn: 'root'
})
export class ApiConfig {
  readonly apiUrl: string = environment.api_url;
  
  // Authentication endpoints
  readonly auth = {
    login: `${this.apiUrl}/users/login`,
    register: `${this.apiUrl}/users`,
    current: `${this.apiUrl}/user`
  };
  
  // Articles endpoints
  readonly articles = {
    list: `${this.apiUrl}/articles`,
    feed: `${this.apiUrl}/articles/feed`,
    get: (slug: string) => `${this.apiUrl}/articles/${slug}`,
    create: `${this.apiUrl}/articles`,
    update: (slug: string) => `${this.apiUrl}/articles/${slug}`,
    delete: (slug: string) => `${this.apiUrl}/articles/${slug}`,
    favorite: (slug: string) => `${this.apiUrl}/articles/${slug}/favorite`,
    unfavorite: (slug: string) => `${this.apiUrl}/articles/${slug}/favorite`
  };
  
  // Comments endpoints
  readonly comments = {
    get: (slug: string) => `${this.apiUrl}/articles/${slug}/comments`,
    create: (slug: string) => `${this.apiUrl}/articles/${slug}/comments`,
    delete: (slug: string, commentId: number) => `${this.apiUrl}/articles/${slug}/comments/${commentId}`
  };
  
  // Profile endpoints
  readonly profiles = {
    get: (username: string) => `${this.apiUrl}/profiles/${username}`,
    follow: (username: string) => `${this.apiUrl}/profiles/${username}/follow`,
    unfollow: (username: string) => `${this.apiUrl}/profiles/${username}/follow`
  };
  
  // Tags endpoint
  readonly tags = `${this.apiUrl}/tags`;
}