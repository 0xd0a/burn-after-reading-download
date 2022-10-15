FROM node:18

WORKDIR /code
COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
CMD [ “node”, “server.js” ]
