# Builder stage
FROM node:14-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Make sure tsconfig.app.json exists
RUN if [ ! -f tsconfig.app.json ]; then echo '{"extends": "./tsconfig.json","compilerOptions": {"outDir": "./out-tsc/app","types": []},"files": ["src/main.ts","src/polyfills.ts"],"include": ["src/**/*.d.ts"]}' > tsconfig.app.json; fi

# Try to run build with Angular CLI directly
RUN npx ng build --configuration production

# Runner stage
FROM nginx:stable-alpine

# Create directory for app
RUN mkdir -p /usr/share/nginx/html

# Copy custom nginx config
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist/conduit /usr/share/nginx/html

# Add nginx configuration for SPA routing
RUN sed -i 's/index  index.html index.htm;/index  index.html index.htm;\n    try_files $uri $uri\/ \/index.html;/' /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]