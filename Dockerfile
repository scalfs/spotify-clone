FROM node:17-slim

RUN apt-get update \
    && apt-get install -y sox libsox-fmt-mp3

# sox 14.4.2

WORKDIR /spotify-radio/

COPY package.json package-lock.json /spotify-radio/

RUN npm ci --silent

COPY . .

USER node

CMD npm run live-reload