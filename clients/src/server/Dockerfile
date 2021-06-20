FROM node:12
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
EXPOSE 3500 3400
CMD ["yarn", "start"]