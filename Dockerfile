FROM node:14

RUN mkdir -p /urs/src/app

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD [ "npm", "start" ]