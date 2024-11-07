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
CMD ["ng", "serve"]

# Build the Angular application for production
RUN ng build 

# Step 2: Serve the app with Nginx
FROM nginx:alpine

# Ensure the nginx.conf file is present in the build context (same folder as Dockerfile)
COPY ./nginx.conf /etc/nginx/nginx.conf

# Remove any default content in Nginx's html folder
RUN rm -rf /usr/share/nginx/html/*

# Copy the Angular build files into the Nginx directory
COPY --from=builder /app/dist/ /usr/share/nginx/html
# Expose the port the app will run on
EXPOSE 80

# Start the Nginx server to serve the app
ENTRYPOINT ["nginx", "-g", "daemon off;"]
