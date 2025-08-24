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
COPY --from=builder /app/build /usr/share/nginx/html

# Copy a custom nginx config (optional)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 5173

# Run nginx
CMD ["nginx", "-g", "daemon off;"]
