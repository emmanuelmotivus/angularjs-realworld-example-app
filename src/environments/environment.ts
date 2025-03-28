// src/environments/environment.ts
// This file replaces the AngularJS app.constants.js with Angular environment configuration
// Angular environments allow different configurations for development, production, etc.

export const environment = {
  production: false,
  api: 'https://conduit.productionready.io/api',
  // Commented out local API URL, can be uncommented for local development
  // api: 'http://localhost:3000/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
};

// Note: To use this in production builds, you would create an environment.prod.ts file
// with the same structure but with production: true and any production-specific settings.
// The Angular CLI will automatically use the appropriate environment file during builds.