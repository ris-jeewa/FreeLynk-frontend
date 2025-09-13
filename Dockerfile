# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json files to working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --frozen-lockfile

# Copy the entire project to working directory
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve app with Nginx
FROM nginx:alpine

# Copy build output to Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 (default Nginx port)
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
