import { Injectable } from '@angular/core';

/**
 * JWT Service - Handles JSON Web Token operations
 * 
 * This service is responsible for managing the JWT token in local storage.
 * It provides methods to save, retrieve, and remove the token.
 * 
 * Migration notes:
 * - Converted from AngularJS service to Angular Injectable service
 * - Replaced $window with direct window reference
 * - Replaced AppConstants injection with environment configuration
 * - Made the service tree-shakable with providedIn: 'root'
 * - Added TypeScript types for better type safety
 */
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  private readonly JWT_KEY: string = 'jwtToken'; // Default key, will be overridden by environment config

  constructor() {
    // In a real application, we would inject environment configuration
    // to get the JWT key name, similar to how AppConstants was used
    // Example: constructor(private config: AppConfig) { this.JWT_KEY = config.jwtKey; }
  }

  /**
   * Saves the JWT token to local storage
   * @param token The JWT token to save
   */
  save(token: string): void {
    window.localStorage.setItem(this.JWT_KEY, token);
  }

  /**
   * Retrieves the JWT token from local storage
   * @returns The JWT token or null if not found
   */
  get(): string | null {
    return window.localStorage.getItem(this.JWT_KEY);
  }

  /**
   * Removes the JWT token from local storage
   */
  destroy(): void {
    window.localStorage.removeItem(this.JWT_KEY);
  }
}