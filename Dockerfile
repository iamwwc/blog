FROM node:10.14.2-alpine as builder

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh;
RUN mkdir -p /root/blog
WORKDIR /root/blog

# package.json 可以独立出来
# http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/

COPY package.json ./package.json
RUN npm install;

COPY . /root/blog
RUN npm run build;

FROM node:10.14.2-alpine
LABEL maintainer="iamwwc<qaq1362211689@gmail.com>"

# server.js 需要的外部模块
# build之后删除 node_modules 
RUN mkdir -p /root/blog
WORKDIR /root/blog
COPY --from=builder /root/blog/ ./
EXPOSE 3000
CMD ["npm","run","start"]