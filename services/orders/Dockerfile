FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_URI=mongodb+srv://setel:3JQAQhzkjLuvjE9b@cluster0.9w2cg.mongodb.net/OrderPayments?retryWrites=true&w=majority

ENV DELAY_DELIVERY=30000

EXPOSE 8000

CMD ["npm", "run", "start"]
