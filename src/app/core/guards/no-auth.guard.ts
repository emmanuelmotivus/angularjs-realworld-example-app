import { Injectable } from '@angular/core';
import { 
  CanActivate, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router 
} from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { UserService } from '../services/user.service';

/**
 * NoAuthGuard protects routes that should not be accessible when authenticated
 * Redirects to home page if the user is already authenticated
 */
@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.userService.isAuthenticated.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(['/']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
