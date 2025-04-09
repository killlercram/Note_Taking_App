# Doing multistagging

#step 1:Building stage
# Using the Light weight Node js image
FROM node:20-alpine AS builder

#Setting working directory inside the docker image
WORKDIR /app

# Installing  dependencies
COPY package*.json ./
COPY tsconfig*.json ./
RUN npm install

# Copy rest of the application code and building app
COPY . .
RUN npm run build


#step 2:Server Stage
FROM node:20-alpine

#installing a simple static file server
RUN npm install -g serve

#copying the build files From previous stage
WORKDIR /app
COPY --from=builder /app/dist .

# Render sets PORT env var automatically
ENV PORT 10000

#Exposing the app's port
EXPOSE 10000


# Run the production server
CMD ["serve", "-s", ".", "-l", "10000"]




