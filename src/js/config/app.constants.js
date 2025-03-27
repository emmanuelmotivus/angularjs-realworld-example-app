// app.constants.ts
// Upgraded from AngularJS to Angular 12
// Constants are now exported as a TypeScript interface and const object
// This allows for better type checking and IDE support

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