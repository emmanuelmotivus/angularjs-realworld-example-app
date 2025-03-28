// src/app/core/constants/app.constants.ts

/**
 * Application-wide constants
 * 
 * This file defines constants used throughout the application.
 * Migrated from AngularJS constants to TypeScript export.
 * 
 * In Angular, we use TypeScript's export functionality instead of
 * AngularJS's constant service registration pattern.
 */
export const AppConstants = {
  /**
   * API endpoint for backend services
   * Points to the production API by default
   */
  api: 'https://conduit.productionready.io/api',
  
  // Uncommented local development API for reference
  // api: 'http://localhost:3000/api',
  
  /**
   * Local storage key for storing the JWT token
   */
  jwtKey: 'jwtToken',
  
  /**
   * Application name used for display purposes
   */
  appName: 'Conduit',
};

// Note: In Angular, we don't need to register constants with Angular's DI system
// as we did in AngularJS. Instead, we can import this file directly where needed.