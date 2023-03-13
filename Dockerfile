FROM node:alpine
COPY . /app
WORKDIR /starterOnly
CMD node index.html