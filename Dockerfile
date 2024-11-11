# Step 1: Build the Angular app
FROM node:20 AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN ng build --configuration production

# Step 2: Use a lightweight Node.js image to serve the app
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the Angular build files from the previous stage
COPY --from=builder /app/dist/ /app

# Install a lightweight HTTP server to serve the Angular app
RUN npm install -g http-server

# Expose the port the app will run on
EXPOSE 8080

# Run the application with HTTP server on port 8080
CMD ["http-server", "-p", "8080", "/app", "-c-1", "--proxy", "http://localhost:8080?"]
