# Use the official Node.js image as the base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app
RUN npm run build

# Expose the port that the app will run on
EXPOSE 3000

# Serve the React app using a simple server (e.g., `serve`)
RUN npm install -g serve

# Start the React app
CMD ["serve", "-s", "build", "-l", "3000"]
