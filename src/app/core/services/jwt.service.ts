import { Injectable } from '@angular/core';
import { AppConstants } from './app-constants.service';

/**
 * JWT Service - Handles JSON Web Token operations
 * 
 * This service is responsible for managing the JWT token in local storage.
 * It provides methods to save, retrieve, and remove the token.
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $window with direct window reference
 * - Made the service tree-shakable with providedIn: 'root'
 * - Added TypeScript types for better type safety
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  constructor(private appConstants: AppConstants) {}

  /**
   * Saves the JWT token to local storage
   * @param token The JWT token to save
   */
  saveToken(token: string): void {
    window.localStorage.setItem(this.appConstants.jwtKey, token);
  }

  /**
   * Retrieves the JWT token from local storage
   * @returns The JWT token or null if not found
   */
  getToken(): string | null {
    return window.localStorage.getItem(this.appConstants.jwtKey);
  }

  /**
   * Removes the JWT token from local storage
   */
  destroyToken(): void {
    window.localStorage.removeItem(this.appConstants.jwtKey);
  }

  /**
   * Alias for getToken() to maintain backward compatibility
   */
  get(): string | null {
    return this.getToken();
  }

  /**
   * Alias for destroyToken() to maintain backward compatibility
   */
  destroy(): void {
    this.destroyToken();
  }
}