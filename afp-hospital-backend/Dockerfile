FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g serverless

COPY . .

EXPOSE 3000

CMD ["serverless", "offline", "--host", "0.0.0.0"]