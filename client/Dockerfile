FROM node
WORKDIR usr/src/client
COPY package.json ./
COPY package-lock.json ./
COPY public ./
RUN yarn install
COPY . .