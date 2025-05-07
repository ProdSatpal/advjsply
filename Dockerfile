# Step 1: Build the Vite app
FROM node:18-alpine AS builder

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Step 2: Serve with custom Nginx config
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY public /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
