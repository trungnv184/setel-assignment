FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV RABBIT_MQ_URL = amqps://hyyyfwsq:Znh8CHBdx4vZFBAajeD3xgWdKkqeOvwu@snake.rmq2.cloudamqp.com/hyyyfwsq

EXPOSE 8001

CMD ["npm", "run", "start"]
