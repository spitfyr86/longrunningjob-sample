FROM node:14.17.0 AS build-env
# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY webapp/package.json webapp/package-lock.json ./
RUN npm ci
COPY webapp/. /app
RUN npm run build:prod

# RUN test here

# Build runtime image
FROM nginx:stable-alpine
RUN set -x && \
    rm /etc/nginx/nginx.conf /etc/nginx/mime.types && \
    mkdir -p /etc/nginx/logs
COPY webapp/h5bp /etc/nginx
COPY --from=build-env /app/dist /usr/share/nginx/html
