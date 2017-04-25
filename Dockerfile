FROM node:latest

WORKDIR /argos-frontend

COPY . .
RUN mv src/config/config-template.js src/config/config.js

RUN npm install && \
    npm run build

EXPOSE 5000

CMD npm run serve
