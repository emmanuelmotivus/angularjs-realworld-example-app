// src/environments/environment.prod.ts

/**
 * Production environment configuration for Angular application
 * 
 * This file replaces the AngularJS app.config.js and contains environment-specific
 * configuration values. In Angular, routing and interceptors are handled separately
 * in app-routing.module.ts and auth.interceptor.ts.
 * 
 * Note: The original AngularJS configuration contained routing and HTTP interceptor setup.
 * In Angular, these are handled in different files:
 * - Routing: app-routing.module.ts
 * - Interceptors: core/interceptors/auth.interceptor.ts
 * 
 * This environment file only contains configuration values relevant for production.
 */
export const environment = {
  production: true,
  apiUrl: 'https://api.example.com', // Replace with your actual API URL
  
  // Additional configuration values that might be needed
  // These would be extracted from the original AngularJS configuration
  useHashRouting: true, // Equivalent to not enabling html5Mode in AngularJS
  
  // Any other environment-specific configuration values
  tokenKey: 'jwtToken',
  defaultRoute: '/'
};

/**
 * Migration notes:
 * 1. The original AngularJS config contained routing configuration which is now in app-routing.module.ts
 * 2. HTTP interceptor registration is now in app.module.ts using the HTTP_INTERCEPTORS token
 * 3. The auth resolver is now handled through route guards and the AuthService
 * 4. HTML5 routing mode is configured in app-routing.module.ts with RouterModule.forRoot({ useHash: !environment.useHashRouting })
 */