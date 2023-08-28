FROM node:20-buster-slim
MAINTAINER Noxus
RUN mkdir -p /app
WORKDIR /app

COPY . .
COPY ["package.json", "./"]

RUN npm install --force

EXPOSE 2000

CMD ["npm","run","start"]
