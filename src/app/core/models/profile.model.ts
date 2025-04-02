import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

/**
 * Profile model interface representing a user profile
 * Migrated from AngularJS Profile service to a TypeScript interface
 */
export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

/**
 * Profile response interface for API responses
 * Added to properly type the HTTP responses
 */
interface ProfileResponse {
  profile: Profile;
}

/**
 * Profile service for managing user profiles
 * Migrated from AngularJS Profile service to Angular Injectable service
 * 
 * Changes from AngularJS:
 * - Converted from ES6 class to TypeScript class with @Injectable decorator
 * - Replaced $http with Angular's HttpClient
 * - Converted Promise-based API to Observable-based API
 * - Replaced AppConstants with environment configuration
 * - Added proper TypeScript typing
 * - Implemented error handling through Observable error propagation
 */
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  
  constructor(
    private http: HttpClient
  ) {}

  /**
   * Get a user profile by username
   * @param username The username to fetch the profile for
   * @returns An Observable of the Profile
   */
  get(username: string): Observable<Profile> {
    return this.http.get<ProfileResponse>(
      `${environment.api}/profiles/${username}`
    ).pipe(
      map(response => response.profile)
    );
  }

  /**
   * Follow a user
   * @param username The username of the user to follow
   * @returns An Observable of the updated Profile
   */
  follow(username: string): Observable<Profile> {
    return this.http.post<ProfileResponse>(
      `${environment.api}/profiles/${username}/follow`, 
      {}
    ).pipe(
      map(response => response.profile)
    );
  }

  /**
   * Unfollow a user
   * @param username The username of the user to unfollow
   * @returns An Observable of the updated Profile
   */
  unfollow(username: string): Observable<Profile> {
    return this.http.delete<ProfileResponse>(
      `${environment.api}/profiles/${username}/follow`
    ).pipe(
      map(response => response.profile)
    );
  }
}