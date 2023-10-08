FROM node@sha256:a0b787b0d53feacfa6d606fb555e0dbfebab30573277f1fe25148b05b66fa097

WORKDIR /usr/src/app

ENV SUBGRAPH_ENDPOINT=http://subgraph:4001/graphql

COPY package.json .

COPY src/index.mjs index.mjs

RUN npm install

CMD [ "node", "index.mjs" ]
