# Step 1: Build the Angular app
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN ng build --configuration production

# Step 2: Use a lightweight static file server
FROM node:20-slim
WORKDIR /app
COPY --from=builder /app/dist/app/ /app

# Install serve
RUN npm install -g serve

# Expose port
EXPOSE 8080

# Use serve to start the app
CMD ["serve", "-s", ".", "-l", "8080"]
