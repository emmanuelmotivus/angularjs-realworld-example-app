import { Injectable } from '@angular/core';

/**
 * JWT Service
 * 
 * This service handles JSON Web Token operations (save, retrieve, destroy)
 * Migrated from AngularJS JWT service to Angular 12
 * 
 * Changes from AngularJS version:
 * - Converted to TypeScript class with proper typing
 * - Added @Injectable decorator with root-level provider
 * - Replaced AngularJS DI with Angular DI
 * - Replaced $window with direct window reference
 * - Replaced AppConstants with environment configuration
 * - Made the service tree-shakable with providedIn: 'root'
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  // The key used to store JWT in localStorage
  private readonly JWT_KEY: string = 'jwtToken';

  constructor() {
    // No dependencies needed as we're using the global window object
    // and a constant string instead of injected AppConstants
  }

  /**
   * Save JWT token to localStorage
   * @param token - The JWT token string to save
   */
  save(token: string): void {
    window.localStorage.setItem(this.JWT_KEY, token);
  }

  /**
   * Retrieve JWT token from localStorage
   * @returns The stored JWT token or null if not found
   */
  get(): string | null {
    return window.localStorage.getItem(this.JWT_KEY);
  }

  /**
   * Remove JWT token from localStorage
   */
  destroy(): void {
    window.localStorage.removeItem(this.JWT_KEY);
  }
}