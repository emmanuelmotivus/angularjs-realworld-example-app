# Conduit Angular 12 Application

## Introduction

This repository contains the Angular 12 version of the Conduit application, a Medium.com clone. This project was migrated from an AngularJS (1.x) codebase to leverage modern Angular features, improved performance, and better maintainability.

## Migration Status

⚠️ **IMPORTANT: This migration is a work in progress and has several unresolved issues.** ⚠️

The codebase is currently in a transitional state with many compilation errors that need to be fixed before it can be fully operational. This README provides guidance on how to work with the project in its current state.

## Running With Docker

For development purposes, we've provided Docker configurations to help you work on the project:

### Development Environment (Recommended)

This will start a development environment where you can work on fixing the migration issues:

```bash
# Build and run the development container
docker-compose up

# Or alternatively
docker build -t angular-dev -f Dockerfile.dev .
docker run -p 4200:4200 -v $(pwd):/app angular-dev
```

### Production Build (Currently not working)

Once all migration issues are fixed, you can use the production Dockerfile:

```bash
docker build -t angular-realworld-app .
docker run -p 4200:80 angular-realworld-app
```

## Key Migration Issues

The following issues need to be addressed:

1. **Missing Component Files**: Many referenced components don't exist in the codebase
2. **Path Problems**: Import paths need to be corrected throughout the application
3. **Module Configuration**: Feature modules need proper imports and declarations
4. **Service Implementation**: Several methods referenced in code are not implemented
5. **TypeScript Strict Mode**: Many properties lack initializers required by strict mode
6. **Template Binding Issues**: Components need proper module imports for template features

## Directory Structure Overview

```
src/
├── app/
│   ├── core/                    # Core services, interceptors, models
│   │   ├── interceptors/        # HTTP interceptors
│   │   ├── models/              # TypeScript interfaces
│   │   ├── services/            # Application-wide services
│   │   └── core.module.ts       # Core module definition
│   ├── shared/                  # Shared components, directives, pipes
│   │   ├── components/          # Reusable components
│   │   ├── directives/          # Custom directives
│   │   ├── pipes/               # Custom pipes
│   │   └── shared.module.ts     # Shared module definition
│   ├── features/                # Feature modules
│   │   ├── article/             # Article feature
│   │   ├── auth/                # Authentication feature
│   │   ├── editor/              # Article editor feature
│   │   ├── home/                # Home page feature
│   │   ├── profile/             # User profile feature
│   │   └── settings/            # User settings feature
│   ├── layout/                  # Application layout components
│   │   ├── footer/              # Footer component
│   │   ├── header/              # Header component
│   │   └── layout.module.ts     # Layout module definition
│   ├── app-routing.module.ts    # Main routing configuration
│   ├── app.component.ts         # Root component
│   └── app.module.ts            # Main application module
└── environments/                # Environment configurations
```

## Common Migration Errors and Fixes

### Cannot find module / Component not found errors

These errors occur when a module referenced in an import statement doesn't exist or has a different path.

**Solution:**
1. Create the missing component file with appropriate content
2. Correct the import path to point to the actual file location
3. Make sure the component is properly exported from its module

### Property has no initializer errors

TypeScript strict mode requires that properties are initialized in the constructor or with a default value.

**Solution:**
1. Add initializers to properties (e.g., `private isLoading = false;`)
2. Use the non-null assertion operator where appropriate (e.g., `article!: Article;`)
3. Add proper typing to function parameters and return values

### Router Link binding errors

These occur when components use routerLink but don't import RouterModule.

**Solution:**
1. Make sure SharedModule imports and exports RouterModule
2. Import SharedModule in all feature modules that use routerLink in templates

### HTTP request errors

These typically arise when API endpoints or HTTP methods don't match what the backend expects.

**Solution:**
1. Update the API endpoint paths in service methods
2. Ensure HTTP request headers and body format match API requirements
3. Properly handle errors from HTTP requests

## Step-by-Step Migration Approach

To complete the migration, follow these steps:

1. **Fix Core Services First**
   - Implement all required methods in JwtService, UserService, etc.
   - Ensure proper error handling in HTTP requests

2. **Create Missing Components**
   - Implement all referenced components that are missing
   - Make sure component selectors match template usage

3. **Update Module Configurations**
   - Add correct imports/exports to all feature modules
   - Register all components in their respective modules

4. **Fix Template Binding Issues**
   - Update templates to use Angular binding syntax
   - Import necessary modules for template directives

5. **Address TypeScript Strict Mode**
   - Add proper typing to all variables and functions
   - Initialize all class properties appropriately

6. **Test Features Incrementally**
   - Test one feature at a time (e.g., authentication, article listing)
   - Fix any runtime errors that occur during testing

## Environment Configuration

The application uses environment files for configuration:

- `src/environments/environment.ts` - Development configuration
- `src/environments/environment.prod.ts` - Production configuration

Update these files with the appropriate API endpoints and other settings.

## API Integration

This application uses the Conduit API which follows the RealWorld API specification. Documentation can be found at: https://github.com/gothinkster/realworld/tree/master/api

## Development Workflow with Docker

Once the development environment is running, you can:

1. Edit code on your local machine
2. The Angular dev server will automatically detect changes and reload
3. View the application at http://localhost:4200
4. Check the browser console for errors

## Contributing to the Migration

If you're working on completing this migration:

1. Focus on fixing one component or feature at a time
2. Add unit tests for fixed components/services
3. Update documentation as issues are resolved
4. Follow Angular style guide and best practices

## Resources for Angular Migration

- [Official Angular Upgrade Guide](https://angular.io/guide/upgrade)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Documentation](https://rxjs.dev/guide/overview)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## License

This project is open source and available under the MIT license.
