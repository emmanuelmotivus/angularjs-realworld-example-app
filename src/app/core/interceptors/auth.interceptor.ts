import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { AppConstants } from '../../config/app.constants';
import { Router } from '@angular/router';

/**
 * Auth Interceptor
 * 
 * Migrated from AngularJS auth.interceptor.js
 * This interceptor handles:
 * 1. Adding Authorization headers to API requests when a JWT token is available
 * 2. Handling 401 Unauthorized responses by clearing the token and redirecting
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private appConstants: AppConstants
  ) {}

  /**
   * Intercept all HTTP requests
   * - Add Authorization header for API requests when token exists
   * - Handle 401 errors by clearing token and redirecting
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is going to our API and if we have a token
    if (request.url.indexOf(this.appConstants.api) === 0 && this.jwtService.get()) {
      // Clone the request to add the Authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.get()}`
        }
      });
    }

    // Pass the modified request to the next handler and catch any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear JWT token
          this.jwtService.destroy();
          
          // Instead of hard page reload, use Angular Router to navigate
          // This preserves the Angular app state better than window.location.reload()
          this.router.navigateByUrl('/login');
        }
        
        // Propagate the error
        return throwError(error);
      })
    );
  }
}