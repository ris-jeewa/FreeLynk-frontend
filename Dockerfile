# Stage 1: Build the app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy source code
COPY . .

# Build the app (production build)
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
