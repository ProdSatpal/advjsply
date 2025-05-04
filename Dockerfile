# Step 1: Build the React (Vite) app
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve the build using Nginx
FROM nginx:alpine

# Copy the Vite build output to Nginx's web folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Update nginx to use port 8080
RUN sed -i 's/80;/8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
