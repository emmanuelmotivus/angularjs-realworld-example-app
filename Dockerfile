# Builder stage
FROM node:10 AS builder
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN ./node_modules/.bin/gulp build

# Runner stage
FROM nginx:stable
RUN rm -rf /etc/nginx/conf.d/*
COPY default.conf /etc/nginx/conf.d/
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]