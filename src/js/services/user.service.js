// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtService } from './jwt.service';
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // BehaviorSubject to track current user state
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  // Current user data
  get current() {
    return this.currentUserSubject.value;
  }

  set current(userData: any) {
    this.currentUserSubject.next(userData);
  }

  constructor(
    private jwtService: JwtService,
    private appConstants: AppConstants,
    private http: HttpClient,
    private router: Router
  ) {}

  // Attempt to authenticate a user
  attemptAuth(type: string, credentials: any): Observable<any> {
    const route = (type === 'login') ? '/login' : '';
    return this.http.post(
      `${this.appConstants.api}/users${route}`,
      { user: credentials }
    ).pipe(
      tap(response => {
        // Save JWT token and update current user
        this.jwtService.save(response.user.token);
        this.current = response.user;
      })
    );
  }

  // Update user data
  update(fields: any): Observable<any> {
    return this.http.put(
      `${this.appConstants.api}/user`,
      { user: fields }
    ).pipe(
      map(response => {
        this.current = response.user;
        return response.user;
      })
    );
  }

  // Logout the current user
  logout(): void {
    this.current = null;
    this.jwtService.destroy();
    // Navigate to current route with reload
    this.router.navigate([this.router.url], { onSameUrlNavigation: 'reload' });
  }

  // Verify if user is authenticated
  verifyAuth(): Observable<boolean> {
    // Check for JWT token
    if (!this.jwtService.get()) {
      return of(false);
    }

    // If we already have current user data, user is authenticated
    if (this.current) {
      return of(true);
    } else {
      // Otherwise, check with the server
      const headers = new HttpHeaders({
        'Authorization': 'Token ' + this.jwtService.get()
      });

      return this.http.get(
        `${this.appConstants.api}/user`,
        { headers }
      ).pipe(
        map(response => {
          this.current = response.user;
          return true;
        }),
        catchError(err => {
          this.jwtService.destroy();
          return of(false);
        })
      );
    }
  }

  // Ensure authentication status matches expected value
  ensureAuthIs(bool: boolean): Observable<boolean> {
    return this.verifyAuth().pipe(
      map(authValid => {
        if (authValid !== bool) {
          this.router.navigateByUrl('/');
          return false;
        }
        return true;
      })
    );
  }
}