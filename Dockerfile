FROM node:latest

WORKDIR /argos-frontend

COPY . .

RUN npm install && \
    npm run build

EXPOSE 5000

CMD npm run serve