import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtService } from './jwt.service';
import { ApiConfig } from '../config/api.config';

// User model interface
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

/**
 * User service responsible for authentication and user operations
 * Migrated from AngularJS User service to Angular service with RxJS
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class UserService {
  // BehaviorSubject to track and emit the current user state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private apiConfig: ApiConfig,
    private router: Router
  ) {}

  /**
   * Get the current user value without subscribing to the Observable
   */
  get getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Attempt authentication (login or register)
   * @param type - 'login' or 'register'
   * @param credentials - User credentials (email, password, etc.)
   */
  attemptAuth(type: 'login' | 'register', credentials: any): Observable<User> {
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post<{user: User}>(
      `${this.apiConfig.api}/users${route}`,
      { user: credentials }
    ).pipe(
      map(response => {
        // Save JWT token and update current user
        this.jwtService.saveToken(response.user.token);
        this.currentUserSubject.next(response.user);
        return response.user;
      }),
      catchError(err => {
        return throwError(() => err);
      })
    );
  }

  /**
   * Update user information
   * @param fields - User fields to update
   */
  update(fields: Partial<User>): Observable<User> {
    return this.http.put<{user: User}>(
      `${this.apiConfig.api}/user`,
      { user: fields }
    ).pipe(
      map(response => {
        // Update the current user with new data
        this.currentUserSubject.next(response.user);
        return response.user;
      }),
      catchError(err => throwError(() => err))
    );
  }

  /**
   * Log out the current user
   */
  logout(): void {
    // Clear user data and token
    this.currentUserSubject.next(null);
    this.jwtService.destroyToken();
    
    // Navigate to home page with reload
    // Note: Angular Router doesn't have a direct equivalent to $state.go with reload
    // Using window.location.reload() after navigation to simulate the same behavior
    this.router.navigateByUrl('/').then(() => {
      window.location.reload();
    });
  }

  /**
   * Verify if the user is authenticated
   * Converted from promise-based to Observable-based
   */
  verifyAuth(): Observable<boolean> {
    // Check for JWT token
    if (!this.jwtService.getToken()) {
      return of(false);
    }

    // If we already have a user, they're authenticated
    if (this.getCurrentUser) {
      return of(true);
    } else {
      // Otherwise, check with the server
      return this.http.get<{user: User}>(
        `${this.apiConfig.api}/user`,
        {
          headers: new HttpHeaders({
            Authorization: `Token ${this.jwtService.getToken()}`
          })
        }
      ).pipe(
        map(response => {
          this.currentUserSubject.next(response.user);
          return true;
        }),
        catchError(() => {
          this.jwtService.destroyToken();
          return of(false);
        })
      );
    }
  }

  /**
   * Ensure the authentication state matches the expected value
   * @param expected - The expected authentication state (true/false)
   */
  ensureAuthIs(expected: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      map(isAuthenticated => {
        if (isAuthenticated !== expected) {
          // Navigate to home if auth state doesn't match expected
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }

  /**
   * Populate the current user data from token
   * Added method to initialize user on app startup
   */
  populate(): void {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.getToken()) {
      this.http.get<{user: User}>(
        `${this.apiConfig.api}/user`,
        {
          headers: new HttpHeaders({
            Authorization: `Token ${this.jwtService.getToken()}`
          })
        }
      ).pipe(
        tap(
          data => this.currentUserSubject.next(data.user),
          err => {
            this.jwtService.destroyToken();
            this.currentUserSubject.next(null);
          }
        )
      ).subscribe();
    } else {
      // Remove any potential remnants of previous auth states
      this.currentUserSubject.next(null);
    }
  }
}