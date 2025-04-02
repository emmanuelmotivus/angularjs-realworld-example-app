import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtService } from '../services/jwt.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

/**
 * AuthInterceptor
 * 
 * This interceptor handles authentication for API requests by:
 * 1. Automatically attaching the JWT token to requests going to our API
 * 2. Handling 401 Unauthorized responses by clearing the token and redirecting
 * 
 * Migrated from AngularJS authInterceptor which used $q and $window services
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  
  constructor(
    private jwtService: JwtService,
    private router: Router
  ) {}

  /**
   * Intercept all HTTP requests
   * - Add Authorization header with JWT token for API requests
   * - Handle 401 errors by clearing token and redirecting to login
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if request is going to our API and we have a token
    if (request.url.indexOf(environment.api_url) === 0 && this.jwtService.getToken()) {
      // Clone the request to add the Authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.getToken()}`
        }
      });
    }

    // Pass the modified request to the next handler and catch any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear any stored JWT token
          this.jwtService.destroyToken();
          
          // Instead of hard page refresh, use Angular Router to navigate to login
          // and reload the application state
          this.router.navigateByUrl('/login');
        }
        
        // Propagate the error
        return throwError(error);
      })
    );
  }
}