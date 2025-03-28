import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import { ApiConfig } from '../config/api.config';
import { Profile, ProfileResponse } from '../models/profile.model';

/**
 * Profile service responsible for managing user profile operations
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $http with Angular's HttpClient
 * - Converted promise-based API to Observable-based API
 * - Added TypeScript interfaces for better type safety
 * - Implemented error handling with RxJS operators
 * - Made service tree-shakable with providedIn: 'root'
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfig
  ) {}

  /**
   * Get a user's profile by username
   * 
   * @param username The username to fetch profile for
   * @returns Observable with profile data
   */
  get(username: string): Observable<Profile> {
    return this.http.get<ProfileResponse>(this.apiConfig.profiles.get(username))
      .pipe(
        map(response => response.profile),
        catchError(error => {
          // Log error and transform to a more user-friendly format
          console.error('Error fetching profile:', error);
          return throwError(() => new Error('Could not load profile'));
        })
      );
  }

  /**
   * Follow a user
   * 
   * @param username The username to follow
   * @returns Observable with updated profile data
   */
  follow(username: string): Observable<Profile> {
    return this.http.post<ProfileResponse>(this.apiConfig.profiles.follow(username), {})
      .pipe(
        map(response => response.profile),
        catchError(error => {
          console.error('Error following user:', error);
          return throwError(() => new Error('Could not follow user'));
        })
      );
  }

  /**
   * Unfollow a user
   * 
   * @param username The username to unfollow
   * @returns Observable with updated profile data
   */
  unfollow(username: string): Observable<Profile> {
    return this.http.delete<ProfileResponse>(this.apiConfig.profiles.unfollow(username))
      .pipe(
        map(response => response.profile),
        catchError(error => {
          console.error('Error unfollowing user:', error);
          return throwError(() => new Error('Could not unfollow user'));
        })
      );
  }
}