import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

/**
 * User model interface defining the structure of a user object
 */
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  [key: string]: any; // For any additional properties
}

/**
 * Credentials interface for login/register
 */
export interface Credentials {
  email: string;
  password: string;
  username?: string;
}

/**
 * User model class
 * 
 * This class represents the user model in the Angular application.
 * It's been migrated from the AngularJS User service class.
 * Instead of being a service itself, this is now a model that will be used by
 * the UserService in the Angular application.
 */
@Injectable({
  providedIn: 'root'
})
export class UserModel {
  // Current authenticated user
  current: User | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtService: any, // This should be replaced with the actual JWT service
    private apiUrl: string // This should be injected from environment or config service
  ) {}

  /**
   * Attempt authentication (login or register)
   * Converted from AngularJS promise-based approach to Observable
   */
  attemptAuth(type: 'login' | 'register', credentials: Credentials): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post<{user: User}>(`${this.apiUrl}/users${route}`, { user: credentials })
      .pipe(
        map(response => {
          // Save JWT token
          this.jwtService.save(response.user.token);
          // Set current user
          this.current = response.user;
          return response.user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Update user profile
   * Converted from AngularJS promise to Observable
   */
  update(fields: Partial<User>): Observable<User> {
    return this.http.put<{user: User}>(`${this.apiUrl}/user`, { user: fields })
      .pipe(
        map(response => {
          // Update current user
          this.current = response.user;
          return response.user;
        }),
        catchError(error => {
          return throwError(() => error);
        })
      );
  }

  /**
   * Logout the current user
   * Converted from AngularJS state reload to Angular Router navigation
   */
  logout(): void {
    this.current = null;
    this.jwtService.destroy();
    // Reload current route to refresh the app state
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  /**
   * Verify if user is authenticated
   * Converted from AngularJS $q deferred to Observable
   */
  verifyAuth(): Observable<boolean> {
    // Check for JWT token
    if (!this.jwtService.get()) {
      return of(false);
    }

    // If we already have the current user, return true
    if (this.current) {
      return of(true);
    }

    // Otherwise, verify with the server
    const headers = new HttpHeaders({
      'Authorization': 'Token ' + this.jwtService.get()
    });

    return this.http.get<{user: User}>(`${this.apiUrl}/user`, { headers })
      .pipe(
        map(response => {
          this.current = response.user;
          return true;
        }),
        catchError(error => {
          this.jwtService.destroy();
          return of(false);
        })
      );
  }

  /**
   * Ensure authentication status matches the expected value
   * Converted from AngularJS $q deferred to Observable
   */
  ensureAuthIs(bool: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      map(authValid => {
        if (authValid !== bool) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    );
  }
}