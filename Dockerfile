FROM node:latest

WORKDIR /argos-frontend

COPY . .
RUN npm install -no-cache

EXPOSE 3000

CMD npm run deploy
