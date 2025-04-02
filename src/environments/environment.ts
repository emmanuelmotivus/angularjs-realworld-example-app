// src/environments/environment.ts
// This file replaces the app.config.js in AngularJS
// In Angular, environment configuration is separated from routing configuration
// Routing will be handled in app-routing.module.ts

export const environment = {
  production: false,
  // Add any environment-specific configuration variables here
  // For example, API URLs, feature flags, etc.
  apiUrl: 'https://api.example.com',
  
  // Configuration options that were in the original file
  // but should be handled differently in Angular:
  
  // HTML5 routing mode (was commented out in original)
  // This is now configured in app-routing.module.ts with RouterModule.forRoot({ useHash: false })
  
  // Default route
  // This is now handled in app-routing.module.ts with { path: '**', redirectTo: '' }
  
  // Auth interceptor
  // This is now provided in app.module.ts or core.module.ts using HTTP_INTERCEPTORS token
};

// The production environment file (environment.prod.ts) would have:
// export const environment = {
//   production: true,
//   apiUrl: 'https://api.production.example.com',
//   ...other production settings
// };