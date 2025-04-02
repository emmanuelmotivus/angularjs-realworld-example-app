import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, from } from 'rxjs';
import { tap, map, catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

// Import services that replace AngularJS dependencies
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';

// User model interface
export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
  [key: string]: any; // For any additional fields
}

/**
 * User service that handles authentication and user operations
 * Migrated from AngularJS User service to Angular service with RxJS
 */
@Injectable({
  providedIn: 'root' // Makes the service tree-shakable and available app-wide
})
export class UserService {
  // BehaviorSubject to track and emit the current user state
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // Expose a getter for the current user value
  get current(): User | null {
    return this.currentUserSubject.value;
  }

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) {}

  /**
   * Authenticate a user (login or register)
   * @param type 'login' or 'register'
   * @param credentials User credentials (email, password, etc.)
   * @returns Observable with user data
   */
  attemptAuth(type: 'login' | 'register', credentials: any): Observable<any> {
    const route = (type === 'login') ? '/login' : '';
    
    return this.http.post<{user: User}>(
      `${environment.api}/users${route}`,
      { user: credentials }
    ).pipe(
      tap(response => {
        // Save JWT token and update current user
        this.jwtService.save(response.user.token);
        this.currentUserSubject.next(response.user);
      }),
      catchError(error => {
        // Handle errors properly
        console.error('Authentication error:', error);
        return of({ errors: error.error.errors });
      })
    );
  }

  /**
   * Update user information
   * @param fields Fields to update
   * @returns Observable with updated user data
   */
  update(fields: Partial<User>): Observable<User> {
    return this.http.put<{user: User}>(
      `${environment.api}/user`,
      { user: fields }
    ).pipe(
      map(response => {
        // Update the current user with new data
        this.currentUserSubject.next(response.user);
        return response.user;
      }),
      catchError(error => {
        console.error('User update error:', error);
        return of(error.error);
      })
    );
  }

  /**
   * Log out the current user
   * Clears token and user data, then navigates to home
   */
  logout(): void {
    // Clear user data and token
    this.currentUserSubject.next(null);
    this.jwtService.destroy();
    
    // Navigate to home with reload
    // Note: Angular Router doesn't have direct equivalent to $state.go with reload
    // Using router.navigate with skipLocationChange and then navigating again
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/']);
    });
  }

  /**
   * Verify if the user is authenticated
   * @returns Observable boolean indicating auth status
   */
  verifyAuth(): Observable<boolean> {
    // Check for JWT token
    if (!this.jwtService.get()) {
      return of(false);
    }

    // If we already have the current user, no need to fetch again
    if (this.current) {
      return of(true);
    }

    // Fetch current user data
    return this.http.get<{user: User}>(
      `${environment.api}/user`,
      {
        headers: new HttpHeaders({
          Authorization: `Token ${this.jwtService.get()}`
        })
      }
    ).pipe(
      tap(response => {
        this.currentUserSubject.next(response.user);
      }),
      map(() => true),
      catchError(error => {
        console.error('Auth verification error:', error);
        this.jwtService.destroy();
        return of(false);
      })
    );
  }

  /**
   * Ensure the authentication state matches the expected value
   * @param bool Expected authentication state
   * @returns Observable boolean indicating if auth state matches expectation
   */
  ensureAuthIs(bool: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      switchMap(authValid => {
        if (authValid !== bool) {
          // Navigate to home if auth state doesn't match
          this.router.navigateByUrl('/');
          return of(false);
        }
        return of(true);
      })
    );
  }

  /**
   * Populate the current user data from token
   * Useful for app initialization
   */
  populate(): void {
    // If JWT detected, attempt to get & store user's info
    if (this.jwtService.get()) {
      this.http.get<{user: User}>(
        `${environment.api}/user`,
        {
          headers: new HttpHeaders({
            Authorization: `Token ${this.jwtService.get()}`
          })
        }
      ).subscribe({
        next: data => this.currentUserSubject.next(data.user),
        error: () => {
          this.jwtService.destroy();
          this.currentUserSubject.next(null);
        }
      });
    } else {
      // Remove any potential remnants of previous auth states
      this.currentUserSubject.next(null);
    }
  }
}