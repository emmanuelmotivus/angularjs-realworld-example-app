// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { JwtService } from '../services/jwt.service';
import { AppConstants } from '../config/app.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Inject the required services
  constructor(
    private jwtService: JwtService,
    private router: Router,
    private appConstants: AppConstants
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request is going to our API and if we have a JWT token
    if (request.url.indexOf(this.appConstants.api) === 0 && this.jwtService.get()) {
      // Clone the request and add the authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Token ${this.jwtService.get()}`
        }
      });
    }

    // Handle the response or any errors
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        // Handle 401 Unauthorized errors
        if (error.status === 401) {
          // Clear any JWT token being stored
          this.jwtService.destroy();
          
          // Navigate to login page instead of hard refresh
          // Note: We could also use window.location.reload() to maintain the original behavior
          this.router.navigateToUrl('/login');
        }
        
        // Propagate the error
        return throwError(error);
      })
    );
  }
}

// To use this interceptor, add it to providers in your AppModule:
// {
//   provide: HTTP_INTERCEPTORS,
//   useClass: AuthInterceptor,
//   multi: true
// }