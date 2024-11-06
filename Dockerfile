# Step 1: Build the Angular app with Node.js v20
FROM node:20 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production
RUN npm run build -- --configuration=production

# Step 2: Serve the app with a simple HTTP server (Nginx)
FROM nginx:alpine

# Copy the Angular build files into the Nginx directory
COPY --from=build /app/dist/my-angular-app /usr/share/nginx/html

# Expose the port the app will run on
EXPOSE 80

# Start the Nginx server to serve the app
CMD ["nginx", "-g", "daemon off;"]
