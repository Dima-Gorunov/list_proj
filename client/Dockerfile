FROM node as client
COPY package.json package-lock.json ./
RUN yarn install && mkdir /react-ui && mv ./node_modules ./react-ui
WORKDIR /react_ui
COPY public ./
COPY . .
RUN yarn run build
FROM nginx:alpine
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=client /react_ui/build /usr/share/nginx/html
ENTRYPOINT ["nginx", "-g", "daemon off;"]