# Step 1: Build the Angular app with Node.js v20
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies separately
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally after installing dependencies
RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Step 2: Use a lightweight Node.js image to serve the app
FROM node:20-alpine

# Set the working directory to /app in the new container
WORKDIR /app

# Copy the Angular build files from the previous build stage
COPY --from=builder /app/dist/app /app

# Install a lightweight HTTP server to serve the app
RUN npm install -g http-server

# Expose the port where the app will run
EXPOSE 8080

# Command to run the application with HTTP server on port 8080
CMD ["http-server", "-p", "8080", "/app"]
