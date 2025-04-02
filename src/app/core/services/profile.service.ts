import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

// Import environment configuration instead of AppConstants
import { environment } from '../../../environments/environment';

/**
 * Interface for Profile data returned from the API
 */
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

/**
 * Interface for API responses containing profile data
 */
interface ProfileResponse {
  profile: Profile;
}

/**
 * ProfileService - Handles user profile operations
 * 
 * Migrated from AngularJS Profile service to Angular service with the following changes:
 * - Converted from AngularJS class to Angular @Injectable service
 * - Replaced $http with Angular's HttpClient
 * - Converted Promise-based API to Observable-based API
 * - Added TypeScript interfaces for better type safety
 * - Implemented proper error handling with RxJS
 * - Made the service tree-shakable with providedIn: 'root'
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable
})
export class ProfileService {
  // API URL from environment configuration
  private apiUrl = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Get a user's profile by username
   * 
   * @param username The username to fetch the profile for
   * @returns Observable with the profile data
   */
  get(username: string): Observable<Profile> {
    return this.http.get<ProfileResponse>(`${this.apiUrl}/profiles/${username}`)
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
   * @param username The username of the user to follow
   * @returns Observable with the updated profile data
   */
  follow(username: string): Observable<ProfileResponse> {
    return this.http.post<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`, {})
      .pipe(
        catchError(error => {
          console.error('Error following user:', error);
          return throwError(() => new Error('Could not follow user'));
        })
      );
  }

  /**
   * Unfollow a user
   * 
   * @param username The username of the user to unfollow
   * @returns Observable with the updated profile data
   */
  unfollow(username: string): Observable<ProfileResponse> {
    return this.http.delete<ProfileResponse>(`${this.apiUrl}/profiles/${username}/follow`)
      .pipe(
        catchError(error => {
          console.error('Error unfollowing user:', error);
          return throwError(() => new Error('Could not unfollow user'));
        })
      );
  }
}