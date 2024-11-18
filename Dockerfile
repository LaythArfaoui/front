# Step 1: Build the Angular app
FROM node:20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build -- --configuration production

# Step 2: Use Nginx to serve the app
FROM nginx:alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx files
RUN rm -rf ./*

# Copy Angular build files from builder stage
COPY --from=builder /app/dist/modernize/ ./

# Copy custom Nginx configuration (if applicable)
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the Nginx port
EXPOSE 80

# Start the Nginx server
CMD ["nginx", "-g", "daemon off;"]
