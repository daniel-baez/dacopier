FROM node:14

WORKDIR /home/node

RUN mkdir -p app/node_modules
RUN mkdir /from /to

ADD ./package.json /home/node/app/package.json
ADD ./package-lock.json /home/node/app/package-lock.json
ADD dacopier.js /home/node/app/dacopier.js

WORKDIR /home/node/app
RUN npm install

VOLUME /from
VOLUME /to

ENTRYPOINT ["node", "dacopier.js"]
