FROM node:latest

WORKDIR /argos-frontend

COPY . .
RUN mv src/config/config-template.js src/config/config.js && \
    npm install

EXPOSE 5000

CMD npm run deploy
