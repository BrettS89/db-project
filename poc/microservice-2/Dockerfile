FROM node:alpine
WORKDIR /app
COPY package.json .
RUN apk update && apk add bash
RUN npm install
COPY . .
RUN chmod +x wait-for-it.sh
ENTRYPOINT ["/bin/sh","-c","./wait-for-it.sh lynxdb-1:4001 -t 5 -- npm start"]
