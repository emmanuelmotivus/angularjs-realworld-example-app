// src/app/core/constants/app.constants.ts

/**
 * Application-wide constants
 * 
 * This file contains constants used throughout the application.
 * Migrated from AngularJS to Angular with the following changes:
 * - Converted to TypeScript with proper export syntax
 * - Using a more Angular-idiomatic approach with named exports
 * - Added TypeScript interface for better type safety
 */

export interface AppConstantsInterface {
  api: string;
  jwtKey: string;
  appName: string;
}

export const AppConstants: AppConstantsInterface = {
  api: 'https://conduit.productionready.io/api',
  // api: 'http://localhost:3000/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
};