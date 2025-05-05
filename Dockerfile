# Step 1: Build the React (Vite) app
FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Step 2: Serve the build using Nginx
FROM nginx:alpine

# Copy Vite build output to Nginx's HTML directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy public files like sitemap.xml and robots.txt
COPY public /usr/share/nginx/html

# Change default Nginx port from 80 to 8080
RUN sed -i 's/80;/8080;/g' /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
