FROM node:latest

WORKDIR /argos-frontend

COPY . .
RUN mv src/config/config-template.js src/config/config.js && \
    npm install

EXPOSE 3000

CMD npm run deploy
