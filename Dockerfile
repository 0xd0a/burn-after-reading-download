FROM node:18-alpine

WORKDIR /code
COPY package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000
EXPOSE 3001

CMD [ "npm", "run", "serve" ]
