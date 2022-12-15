FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

ENV API_URL http://api.example.com

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
