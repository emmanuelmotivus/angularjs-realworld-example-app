// src/environments/environment.prod.ts
// This file contains production environment configuration for the Angular application
// It replaces the AngularJS app.constants.js file with Angular environment configuration

export const environment = {
  production: true,
  api: 'https://conduit.productionready.io/api',
  // Uncommented local API URL is preserved as a comment for development reference
  // api: 'http://localhost:3000/api',
  jwtKey: 'jwtToken',
  appName: 'Conduit',
};