import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import environment configuration instead of AppConstants
import { environment } from '../../../environments/environment';

/**
 * Interface for the tags response from the API
 */
interface TagsResponse {
  tags: string[];
}

/**
 * Tags service - provides methods to fetch tags from the API
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $http with HttpClient
 * - Converted promise-based API to Observable-based API
 * - Added proper TypeScript typing
 * - Added error handling with RxJS operators
 * - Made service tree-shakable with providedIn: 'root'
 * - Replaced AppConstants with environment configuration
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class TagsService {
  
  /**
   * API URL from environment configuration
   */
  private apiUrl = environment.api;

  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get all available tags
   * 
   * @returns Observable of string array containing all tags
   */
  getAll(): Observable<string[]> {
    return this.http.get<TagsResponse>(`${this.apiUrl}/tags`)
      .pipe(
        map(response => response.tags),
        catchError(error => {
          // Log error or handle it as needed
          console.error('Error fetching tags', error);
          return throwError(() => new Error('Failed to fetch tags'));
        })
      );
  }
}