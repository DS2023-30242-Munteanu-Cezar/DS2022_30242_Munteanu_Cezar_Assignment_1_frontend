FROM node:16.17.1
WORKDIR /app
COPY package.json ./
RUN npm install force
RUN npm install node-sass
COPY . .
EXPOSE 3000
CMD ["npm", "start"]