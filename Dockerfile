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
RUN ng build --prod

# Step 2: Serve the app with a lightweight HTTP server
# Use a minimal Node.js image to serve the app
FROM node:20-slim

# Set the working directory
WORKDIR /app

# Copy the Angular build files from the builder stage
COPY --from=builder /app/dist/ /app

# Install a lightweight HTTP server, like http-server, to serve the app
RUN npm install -g http-server

# Expose the port that the app will run on
EXPOSE 8080

# Start the server
CMD ["http-server", "-p", "8080"]
