FROM node:7-alpine

WORKDIR /argos-frontend

COPY . .
RUN npm install

EXPOSE 3000

CMD npm run deploy
