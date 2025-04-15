FROM node:20

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

# Install nodemon globally (optional but common)
RUN npm install -g nodemon

# Copy the rest of the app
COPY . .

# Expose your backend port
EXPOSE 5000

# Run using nodemon
CMD ["npm", "run", "dev"]
