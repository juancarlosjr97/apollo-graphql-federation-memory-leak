FROM node@sha256:a0b787b0d53feacfa6d606fb555e0dbfebab30573277f1fe25148b05b66fa097

WORKDIR /usr/src/app

COPY package.json .
COPY src/index.mjs index.mjs

RUN npm install

CMD [ "node", "index.mjs" ]
