FROM nginx

# Copy the build folder from the React application to the nginx public folder
COPY build /usr/share/nginx/html

# Expose the default nginx port
EXPOSE 80

# Set the default command to start the nginx server
CMD ["nginx", "-g", "daemon off;"]