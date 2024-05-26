FROM node:lts-buster

# libwebp-dev\
RUN apt-get update && \
    apt-get install -y \
    ffmpeg \
    imagemagick \
    zip\
    neofetch\
    speedtest-cli\ 
    webp && \
    apt-get upgrade -y && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

COPY . .
 
# Change ownership to the non-root user
RUN chown -R node:node .

EXPOSE 8080

USER node

CMD ["node", "index.js"]
