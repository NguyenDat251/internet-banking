FROM node:12-buster-slim
WORKDIR /usr/src/backend-banking
COPY ./backend-banking/package*.json ./
RUN npm install
RUN npm install -g nodemon
CMD ["nodemon", "start"]