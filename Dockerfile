# Step 1: Build the Angular app with Node.js v20
FROM node:20 AS builder

WORKDIR /app
RUN npm install -g @angular/cli

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Step 2: Serve the app with a lightweight HTTP server
FROM node:20-slim

WORKDIR /app

# Copy the Angular build files from the builder stage
COPY --from=builder /app/dist/ /app

# Install a lightweight HTTP server
RUN npm install -g http-server

# Expose the port
EXPOSE 8080

# Start the server
CMD ["http-server", "-p", "8080"]
