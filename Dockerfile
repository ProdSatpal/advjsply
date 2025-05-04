FROM nginx:alpine

# Remove the default site
RUN rm -rf /usr/share/nginx/html/*

# Copy your website content
COPY . /usr/share/nginx/html

# Tell Nginx to listen on port 8080 for Cloud Run
RUN sed -i 's/80;/8080;/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
