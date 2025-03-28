import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiConfig } from '../config/api.config';

interface TagsResponse {
  tags: string[];
}

/**
 * Tags service responsible for fetching article tags
 */
@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) {}

  /**
   * Get all available tags
   * 
   * @returns Observable with an array of tag names
   */
  getAll(): Observable<string[]> {
    return this.http.get<TagsResponse>(this.apiConfig.tags)
      .pipe(
        map(response => response.tags),
        catchError(error => {
          console.error('Error fetching tags:', error);
          return throwError(() => new Error('Could not load tags'));
        })
      );
  }
}