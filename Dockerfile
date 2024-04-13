# Use the Node.js LTS image as the base image for building
FROM node:lts AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Copy the rest of the application code to the working directory
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Define the port number the container should expose
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT

# Set the entry point command to start the application in development mode
# ENTRYPOINT ["npm", "run", "start:dev"]

# Run migrations when the container starts
CMD [ "npm run migration:run" ]
