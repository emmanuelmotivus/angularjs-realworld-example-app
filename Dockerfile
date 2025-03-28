# Stage 1: Use Node.js for the application
FROM node:16-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Stage 2: Serve the application with NGINX
FROM nginx:alpine

# Add labels
LABEL maintainer="Your Name <your.email@example.com>"
LABEL description="Conduit - Angular/AngularJS RealWorld Example Application"
LABEL version="1.0"

# Copy NGINX configuration
COPY default.conf /etc/nginx/conf.d/default.conf

# Copy built files from the previous stage
COPY --from=builder /app/src /usr/share/nginx/html

# Add security headers
RUN sed -i 's/location \/ {/location \/ {\n    add_header X-Frame-Options SAMEORIGIN;\n    add_header X-Content-Type-Options nosniff;\n    add_header X-XSS-Protection "1; mode=block";/' /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
