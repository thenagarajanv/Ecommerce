# Use the official Node.js image as the base image
FROM node:18-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if you have it)
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight web server to serve the app
FROM nginx:alpine

# Copy the built files from the build stage to the nginx html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx server
CMD ["nginx", "-g", "daemon off;"]
