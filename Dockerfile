FROM node:10.14.2-alpine as builder

RUN mkdir -p /root/blog
COPY . /root/blog
WORKDIR /root/blog

RUN npm install ;\
    npm run build;\
    rm -rf ./node_modules/ plugins/ src/

FROM node:10.14.2-alpine
LABEL maintainer="iamwwc<qaq1362211689@gmail.com>"

# server.js 需要的外部模块
# build之后删除 node_modules 
RUN mkdir -p /root/blog
WORKDIR /root/blog
COPY --from=builder /root/blog/ ./
EXPOSE 3000
CMD ["npm","run","start"]