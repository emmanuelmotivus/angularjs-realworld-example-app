// jwt.service.ts
import { Injectable } from '@angular/core';
import { AppConstants } from '../config/app.constants';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  
  constructor(private appConstants: AppConstants) {
    // Angular DI will handle injection without 'ngInject'
  }

  save(token: string): void {
    // Using window directly instead of $window service
    window.localStorage.setItem(this.appConstants.jwtKey, token);
  }

  get(): string | null {
    // Using window directly instead of $window service
    return window.localStorage.getItem(this.appConstants.jwtKey);
  }

  destroy(): void {
    // Using window directly instead of $window service
    window.localStorage.removeItem(this.appConstants.jwtKey);
  }
}