FROM node:20.11.1-alpine as builder

# Объявляем аргументы сборки
ARG SERVER_NAME

WORKDIR /usr/src/client

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Передаем переменную окружения во время сборки
RUN SERVER_NAME=${SERVER_NAME} npm run build

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /usr/src/client/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]