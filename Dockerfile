FROM node:12-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm cache clean --force
RUN npm install --save-dev

COPY . ./

RUN npm rebuild node-sass --force
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]