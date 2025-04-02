import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Interface for the tags response from the API
 */
interface TagsResponse {
  tags: string[];
}

/**
 * Tags service - Handles fetching article tags from the API
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $http with Angular's HttpClient
 * - Converted promise-based API to Observable pattern using RxJS
 * - Added proper TypeScript typing
 * - Made service tree-shakable with providedIn: 'root'
 * - Replaced AppConstants with environment configuration
 * - Added error handling with RxJS operators
 */
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get all available tags from the API
   * 
   * @returns Observable of string array containing all tags
   */
  getAll(): Observable<string[]> {
    return this.http.get<TagsResponse>(`${environment.api}/tags`)
      .pipe(
        map(response => response.tags),
        catchError(error => {
          console.error('Error fetching tags:', error);
          throw error;
        })
      );
  }
}