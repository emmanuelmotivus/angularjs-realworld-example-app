# Conduit - Angular/AngularJS RealWorld Example Application

## Overview
This is a simplified implementation of the [RealWorld](https://github.com/gothinkster/realworld) Medium.com clone using AngularJS with a migration path to Angular. It demonstrates a real-world application with authentication, CRUD operations, routing, and more.

This project represents a transitional state from AngularJS to Angular 12, showcasing how to maintain functionality during a complex migration.

## Features
- Home page with banner and tag list
- Authentication (Sign In/Sign Up)
- Responsive layout
- Docker deployment

## Getting Started

### Prerequisites
- Docker installed on your system
- Basic knowledge of AngularJS/Angular

### Running with Docker
The simplest way to run this application is using Docker:

```bash
# Build the Docker image
docker build -t conduit-angular .

# Run the container
docker run -p 80:80 conduit-angular
```

Then access the application at http://localhost:80

### Local Development
If you want to develop locally without Docker:

```bash
# Install dependencies
npm install

# Start a local server
npx http-server src -p 8080 --cors -c-1
```

Then access the application at http://localhost:8080

## Project Structure
The project follows a feature-based organization:

```
src/
├── js/
│   ├── app.js                   # Main application bootstrapping
│   ├── config/                  # App configuration
│   ├── services/                # Data services
│   ├── components/              # Reusable components
│   ├── layout/                  # Layout components (header, footer)
│   ├── home/                    # Home page feature
│   ├── auth/                    # Authentication feature
│   ├── profile/                 # Profile feature (WIP)
│   ├── article/                 # Article feature (WIP)
│   ├── editor/                  # Editor feature (WIP)
│   └── settings/                # Settings feature (WIP)
├── index.html                   # Main HTML entry point
└── simple.html                  # Simplified version for debugging
```

## Migration Notes
This project is in a transitional state from AngularJS to Angular 12. The current implementation:

1. Uses AngularJS UI-Router for routing
2. Has a component-based architecture compatible with Angular
3. Includes preparations for upgrading to TypeScript

## Docker Configuration
The Docker setup uses a multi-stage build:

1. Node.js stage to build the application
2. NGINX stage to serve the static files

The NGINX configuration includes security headers and proper single-page application routing.

## License
MIT

## Contributing
Pull requests and issues are welcome. For major changes, please open an issue first to discuss what you would like to change.
