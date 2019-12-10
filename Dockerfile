FROM node:12.13.1

MAINTAINER Ryan Hwang "hsw0194@gmail.com"

# RUN npm install -g pm2

ENV NODE_ENV production

EXPOSE 9000

COPY ./ /docker_node_server

WORKDIR /docker_node_server

RUN npm install --prefix /docker_node_server

CMD ["npm","start"]



