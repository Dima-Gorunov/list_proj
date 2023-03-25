FROM node
WORKDIR /usr/src/backend
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .