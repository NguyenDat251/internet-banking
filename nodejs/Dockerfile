FROM node:12-buster-slim
COPY ./backend-banking /usr/src/backend-banking
WORKDIR /usr/src/backend-banking
RUN npm install
RUN npm install -g nodemon
CMD ["nodemon", "start"]
