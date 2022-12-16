FROM node:latest as builder

WORKDIR /app

COPY . /app/ 
RUN npm install 
RUN npm install react-scripts@3.0.1 -g

COPY ./ /app/
RUN npm run build

FROM nginx:1.21.0-alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

# Start nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
