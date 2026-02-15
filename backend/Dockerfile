FROM node:20.11.1-alpine

WORKDIR /usr/src/backend

# Копируем только package.json сначала
COPY package.json package-lock.json ./

# Удаляем возможный кэш и переустанавливаем с компиляцией
RUN npm cache clean --force && \
    rm -rf node_modules && \
    npm install --build-from-source

# Теперь копируем остальной код
COPY . .

EXPOSE 5000