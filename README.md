# Conduit Angular 12 Application

## Introduction

This repository contains the Angular 12 version of the Conduit application, a Medium.com clone. This project was migrated from an AngularJS (1.x) codebase to leverage modern Angular features, improved performance, and better maintainability.

## Directory Structure Overview

```
conduit-angular/
├── e2e/                             # End-to-end tests
├── node_modules/                    # Dependencies
├── src/
│   ├── app/
│   │   ├── core/                    # Core services, interceptors, models
│   │   │   ├── interceptors/        # HTTP interceptors
│   │   │   ├── models/              # TypeScript interfaces
│   │   │   ├── services/            # Application-wide services
│   │   │   └── core.module.ts       # Core module definition
│   │   ├── shared/                  # Shared components, directives, pipes
│   │   │   ├── components/          # Reusable components
│   │   │   ├── directives/          # Custom directives
│   │   │   ├── pipes/               # Custom pipes
│   │   │   └── shared.module.ts     # Shared module definition
│   │   ├── features/                # Feature modules
│   │   │   ├── article/             # Article feature
│   │   │   ├── auth/                # Authentication feature
│   │   │   ├── editor/              # Article editor feature
│   │   │   ├── home/                # Home page feature
│   │   │   ├── profile/             # User profile feature
│   │   │   └── settings/            # User settings feature
│   │   ├── layout/                  # Application layout components
│   │   │   ├── footer/              # Footer component
│   │   │   ├── header/              # Header component
│   │   │   └── layout.module.ts     # Layout module definition
│   │   ├── app-routing.module.ts    # Main routing configuration
│   │   ├── app.component.ts         # Root component
│   │   └── app.module.ts            # Main application module
│   ├── assets/                      # Static assets
│   ├── environments/                # Environment configurations
│   ├── index.html                   # Main HTML file
│   ├── main.ts                      # Application entry point
│   ├── polyfills.ts                 # Browser polyfills
│   └── styles.scss                  # Global styles
├── angular.json                     # Angular CLI configuration
├── package.json                     # Dependencies and scripts
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## Setup Instructions

### Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/conduit-angular.git
   cd conduit-angular
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Complete the manual changes listed in the "Manual Changes Required" section below.

## Development Workflow

### Development Server

Run the development server:
```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The app will automatically reload if you change any of the source files.

### Build

Build the project for production:
```bash
ng build --prod
```

The build artifacts will be stored in the `dist/` directory.

### Running Tests

#### Unit Tests

Execute unit tests via Karma:
```bash
ng test
```

#### End-to-End Tests

Run end-to-end tests via Protractor:
```bash
ng e2e
```

### Code Linting

Lint the codebase:
```bash
ng lint
```

## Migration Notes

### Key Changes from AngularJS

1. **Component Architecture**: Replaced AngularJS controllers with Angular components
2. **Dependency Injection**: Updated to use TypeScript-based dependency injection
3. **Routing**: Migrated from UI-Router to Angular Router
4. **HTTP Requests**: Replaced $http with HttpClient and RxJS Observables
5. **Forms**: Migrated to Reactive Forms from AngularJS forms
6. **Directives**: Updated custom directives to Angular format
7. **Build System**: Replaced Gulp/Browserify with Angular CLI

### Limitations and Challenges

- Some components may still contain AngularJS patterns that need refactoring
- Type safety is not fully implemented across all components (some `any` types remain)
- Error handling has been improved but may need further refinement
- The application uses a mix of template-driven and reactive forms

## Angular 12 Features Implemented

- **Strict Type Checking**: Enabled strict type checking in TypeScript configuration
- **Lazy Loading**: Feature modules are lazy-loaded for better performance
- **HttpClient**: Modern HTTP client with interceptors for authentication
- **Angular Router**: Feature-rich routing with guards and resolvers
- **Reactive Forms**: Type-safe form handling with validation
- **RxJS**: Observable-based state management and HTTP requests
- **Standalone Components**: Some components are implemented as standalone (where appropriate)
- **Ivy Renderer**: Leveraging Angular's Ivy rendering engine for better performance

## Manual Changes Required

Before running the application, you need to complete the following files that were not fully migrated:

1. **tsconfig.json**: Complete the TypeScript configuration
   ```json
   {
     "compileOnSave": false,
     "compilerOptions": {
       "baseUrl": "./",
       "outDir": "./dist/out-tsc",
       "sourceMap": true,
       "declaration": false,
       "downlevelIteration": true,
       "experimentalDecorators": true,
       "moduleResolution": "node",
       "importHelpers": true,
       "target": "es2017",
       "module": "es2020",
       "lib": [
         "es2018",
         "dom"
       ],
       "strict": true,
       "noImplicitReturns": true,
       "noFallthroughCasesInSwitch": true
     },
     "angularCompilerOptions": {
       "enableI18nLegacyMessageIdFormat": false,
       "strictInjectionParameters": true,
       "strictInputAccessModifiers": true,
       "strictTemplates": true
     }
   }
   ```

2. **src/styles.scss**: Add global styles
   ```scss
   /* You can add global styles to this file, and also import other style files */
   @import url('//demo.productionready.io/main.css');
   @import url('//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
   @import url('//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic');
   ```

3. **src/polyfills.ts**: Add required polyfills
   ```typescript
   /**
    * This file includes polyfills needed by Angular and is loaded before the app.
    */
   import 'zone.js';  // Included with Angular CLI.
   ```

4. **src/app/core/models/api-response.model.ts**: Create API response interfaces
   ```typescript
   export interface ApiResponse<T> {
     data: T;
   }
   
   export interface ErrorResponse {
     errors: {
       [key: string]: string[];
     };
   }
   ```

5. **src/app/core/services/api.service.ts**: Create base API service
   ```typescript
   import { Injectable } from '@angular/core';
   import { HttpClient, HttpParams } from '@angular/common/http';
   import { Observable, throwError } from 'rxjs';
   import { catchError } from 'rxjs/operators';
   import { environment } from '../../../environments/environment';
   
   @Injectable({
     providedIn: 'root'
   })
   export class ApiService {
     constructor(private http: HttpClient) {}
   
     private formatErrors(error: any) {
       return throwError(error.error);
     }
   
     get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
       return this.http.get<T>(`${environment.api_url}${path}`, { params })
         .pipe(catchError(this.formatErrors));
     }
   
     put<T>(path: string, body: object = {}): Observable<T> {
       return this.http.put<T>(
         `${environment.api_url}${path}`,
         JSON.stringify(body)
       ).pipe(catchError(this.formatErrors));
     }
   
     post<T>(path: string, body: object = {}): Observable<T> {
       return this.http.post<T>(
         `${environment.api_url}${path}`,
         JSON.stringify(body)
       ).pipe(catchError(this.formatErrors));
     }
   
     delete<T>(path: string): Observable<T> {
       return this.http.delete<T>(
         `${environment.api_url}${path}`
       ).pipe(catchError(this.formatErrors));
     }
   }
   ```

6. **src/app/core/services/auth-guard.service.ts**: Create authentication guard
   ```typescript
   import { Injectable } from '@angular/core';
   import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
   import { Observable } from 'rxjs';
   import { take, map } from 'rxjs/operators';
   import { UserService } from './user.service';
   
   @Injectable({
     providedIn: 'root'
   })
   export class AuthGuard implements CanActivate {
     constructor(
       private router: Router,
       private userService: UserService
     ) {}
   
     canActivate(
       route: ActivatedRouteSnapshot,
       state: RouterStateSnapshot
     ): Observable<boolean> {
       return this.userService.isAuthenticated.pipe(
         take(1),
         map(isAuth => {
           if (!isAuth) {
             this.router.navigate(['/login']);
             return false;
           }
           return true;
         })
       );
     }
   }
   ```

## Troubleshooting Common Issues

### "Cannot find module" or "Cannot resolve module" errors

This usually indicates a missing dependency or incorrect import path.

**Solution**: 
- Check that all dependencies are installed
- Verify import paths are correct (remember that Angular uses relative paths)
- Run `npm install` to ensure all dependencies are properly installed

### HTTP requests failing with 401 Unauthorized

This may indicate issues with the authentication interceptor.

**Solution**:
- Check that the JWT token is being properly stored and retrieved
- Verify that the auth interceptor is correctly adding the Authorization header
- Ensure the token format matches what the backend expects

### Components not rendering properly

This could be due to template syntax differences between AngularJS and Angular.

**Solution**:
- Check for any remaining AngularJS syntax (ng-if, ng-repeat, etc.) and replace with Angular equivalents (*ngIf, *ngFor)
- Verify that component selectors are properly used in templates
- Check the browser console for any template errors

### RxJS Observable issues

Problems with handling asynchronous operations.

**Solution**:
- Make sure to subscribe to Observables to trigger HTTP requests
- Use appropriate RxJS operators for transforming data
- Check for proper error handling in Observable chains

## Deployment Instructions

### Building for Production

```bash
ng build --prod
```

This creates optimized production files in the `dist/` directory.

### Deployment Options

#### Static Hosting (Netlify, Vercel, GitHub Pages)

1. Build the application
2. Upload the contents of the `dist/` directory to your hosting provider
3. Configure your hosting provider to handle Angular's client-side routing

#### Server Deployment (AWS, Azure, Heroku)

1. Build the application
2. Set up your server to serve the static files from the `dist/` directory
3. Configure your server to redirect all requests to `index.html` for client-side routing

## Testing Procedures

### Unit Testing Strategy

- Test each component in isolation using TestBed
- Mock dependencies using jasmine spies or custom mock services
- Test services with HttpClientTestingModule for HTTP requests
- Focus on testing component logic, service methods, and pipes

### Integration Testing

- Test component interactions
- Verify that components work together correctly
- Test routing and navigation flows

### End-to-End Testing

- Test complete user flows (login, article creation, commenting, etc.)
- Verify that the application works as expected in a real browser environment
- Test responsive design and layout

### Test Coverage

Run tests with coverage reporting:
```bash
ng test --code-coverage
```

This generates a coverage report in the `coverage/` directory.

---

## Additional Notes

- The application uses a real-world API that follows the [RealWorld API spec](https://github.com/gothinkster/realworld/tree/master/api)
- This project follows Angular best practices and style guidelines
- For any issues or questions, please open an issue in the repository