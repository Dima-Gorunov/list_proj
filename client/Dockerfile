FROM node as builder
WORKDIR usr/src/client
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder usr/src/client/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]