# Облачное хранилище

## 📋 Описание проекта

Проект представляет собой облачное хранилище файлов с клиент-серверной архитектурой. Пользователи могут регистрироваться, загружать и управлять файлами после активации администратором.

## 🛠 Технологический стек

- **Frontend**: React, MUI (Material-UI), Webpack, Node.js (версия 20.11.1)
- **Backend**: Node.js (версия 20.11.1), Express
- **База данных**: PostgreSQL 17
- **Контейнеризация**: Docker, Docker Compose
- **Прокси-сервер**: Nginx

---

## 🚀 Часть 1. Локальный запуск (режим разработки)

### Предварительные требования
- Node.js версии **20.11.1**
- PostgreSQL версии **17**
- npm или yarn

### Настройка базы данных

1. Установите и запустите PostgreSQL 17
2. Создайте базу данных:
```sql
CREATE DATABASE your_dev_database;
```
3. Убедитесь, что у вас есть пользователь с правами доступа к этой базе

### Настройка backend

Все основные настройки для разработки находятся в файле `backend/constantDev.js`:

```javascript
// Пример содержимого constantDev.js
{
  SERVER_NAME: 'http://localhost:5000',
  CLIENT_NAME: 'http://localhost:3000',
  PGDATABASE: 'your_dev_database',
  PGUSER: 'your_dev_user',
  PGPASSWORD: 'your_dev_password',
  PGHOST: 'localhost',
  DIALECT: 'postgres',
  JWT_ACCESS_STRING: 'your_jwt_access_secret',
  JWT_REFRESH_STRING: 'your_jwt_refresh_secret',
  SECRET_ADMIN_STRING_DEV: 'your-secret-for-admin',
  FILE_PATH: 'C:/Folder1',           // путь на вашем компьютере
  FILE_PATH2: 'D:/Folder1',           // путь на вашем компьютере
  // ... другие настройки
}
```

**Важно!** Отредактируйте этот файл, подставив свои реальные значения:
- Параметры подключения к PostgreSQL
- Секретные строки для JWT и администратора
- Пути для сохранения файлов

### Запуск backend

```bash
cd backend
npm install
npm run start
```

Backend будет доступен по адресу: `http://localhost:5000`

### Настройка frontend

В режиме разработки frontend запускается через Webpack Dev Server. Адрес backend указывается в скрипте запуска в `client/package.json`:

```json
"scripts": {
  "start": "cross-env SERVER_NAME=http://localhost:5000 webpack serve --env mode=development"
}
```

По умолчанию frontend обращается к backend по адресу `http://localhost:5000`. При необходимости измените этот адрес в команде `start`.

### Запуск frontend

```bash
cd client
npm install
npm run start
```

Frontend будет доступен по адресу: `http://localhost:3000` (или другой порт, указанный в Webpack)

---

## 🐳 Часть 2. Запуск в Docker

### Особенности Docker-версии

В Docker все настройки задаются **только через `docker-compose.yml`**. Файл `backend/constantDev.js` в контейнере **не используется** — все переменные окружения передаются через `environment` в компоуз-файле.

### Предварительные требования
- Установленный Docker
- Установленный Docker Compose

### Файл docker-compose.yml

Основной файл конфигурации содержит все необходимые настройки:

```yaml
# version: "3" можно удалить

# при изменениях
# docker-compose down && docker-compose up -d --build


# подключиться к бд в контейнере
# docker-compose exec postgres_db psql -U your_dev_user -d your_dev_database

services:
    postgres_db:
        container_name: "postgres_db_container"
        image: postgres:17
        restart: always
        ports:
            - "5432:5432"
        environment:
            - POSTGRES_USER=your_dev_user
            - POSTGRES_PASSWORD=your_dev_password
            - POSTGRES_DB=your_dev_database
        volumes:
            - C:/database-list-proj/:/var/lib/postgresql/data
        healthcheck:
            test: ["CMD-SHELL", "pg_isready -U your_dev_user -d your_dev_database"]
            interval: 5s
            timeout: 5s
            retries: 10
            start_period: 15s

    client_nginx:
        container_name: "client_nginx_container"
        restart: always
        build:
            context: ./client
            dockerfile: Dockerfile
            args:
                - SERVER_NAME=http://localhost:5000
        ports:
            - "80:80"
        volumes:
            - ./client/nginx/nginx.conf:/etc/nginx/nginx.conf
        depends_on:
            - backend

    backend:
        container_name: "backend_container"
        depends_on:
            postgres_db:
                condition: service_healthy # Критически важно!
        restart: always
        build:
            context: ./backend
            dockerfile: Dockerfile
        ports:
            - "5000:5000"
        command: npm run start
        environment:
            - PGDATABASE=your_dev_database
            - PGUSER=your_dev_user
            - PGPASSWORD=your_dev_password
            - DIALECT=postgres
            - PGHOST=postgres_db # Название контейнера!
            - SERVER_NAME=http://localhost:5000
            - CLIENT_NAME=http://localhost
            - JWT_ACCESS_STRING=your_jwt_access_secret
            - JWT_REFRESH_STRING=your_jwt_refresh_secret
            - FILE_PATH=/usr/src/C/Folder1 # Совпадать с volumes после ":"!
            - FILE_PATH2=/usr/src/D/Folder1 # Совпадать с volumes после ":"!
            - SECRET_ADMIN_STRING=your-secret-for-admin
            - SMTP_HOST=your_smtp_host
            - SMTP_PORT=your_smtp_port
            - SMTP_USER=your_smtp_user
            - SMTP_APP_PASSWORD=your_smtp_app_password
        volumes:
            - C:/Folder1:/usr/src/C/Folder1
            - D:/Folder1:/usr/src/D/Folder1
```

**Важные отличия от локального запуска:**
- `PGHOST: postgres_db` — внутри Docker-сети используется имя сервиса, а не `localhost`
- Пути к файлам внутри контейнера: `/usr/src/C/Folder1` (не `C:/Folder1`)
- Все секреты и настройки задаются через `environment`, а не через `constantDev.js`

### Запуск всех сервисов

```bash
docker-compose up -d
```

После запуска будут доступны:
- **Frontend**: http://localhost:80 (через Nginx)
- **Backend**: http://localhost:5000
- **PostgreSQL**: localhost:5432 (доступ только с хоста)

### Остановка сервисов

```bash
docker-compose down
```

### Пересборка и запуск после изменений

```bash
docker-compose down && docker-compose up -d --build
```

### Просмотр логов

```bash
# Логи всех контейнеров
docker-compose logs -f

# Логи конкретного сервиса
docker-compose logs -f backend
docker-compose logs -f client_nginx
docker-compose logs -f postgres_db
```

---

## 📁 Структура проекта

```
project/
├── client/                 # Frontend приложение
│   ├── nginx/              # Конфигурация Nginx для Docker
│   │   └── nginx.conf
│   ├── Dockerfile          # Dockerfile для frontend
│   ├── package.json        # содержит скрипт start для разработки
│   └── ...                 # исходный код React
│
├── backend/                 # Backend приложение
│   ├── constantDev.js      # Конфигурация ТОЛЬКО для локальной разработки
│   ├── Dockerfile          # Dockerfile для backend
│   ├── package.json
│   └── ...                 # исходный код Node.js
│
└── docker-compose.yml       # Docker Compose конфигурация (все настройки здесь)
```

---

## 👥 Роли и доступ

### Обычный пользователь
1. Регистрируется в системе
2. Ожидает активации администратором
3. После активации получает доступ к функциям хранилища

### Администратор
Для создания администратора необходимо:
1. Открыть фронтенд с query-параметром `isAdmin=true`
   ```
   http://localhost:3000/#/login?isAdmin=true   # для разработки
   http://localhost/#/login?isAdmin=true        # для Docker
   ```
2. В форме регистрации появится дополнительное поле для секретной строки
3. Ввести секретную строку, которая должна совпадать с:
   - **При локальном запуске**: `SECRET_ADMIN_STRING_DEV` из `backend/constantDev.js`
   - **При запуске в Docker**: переменной окружения `SECRET_ADMIN_STRING` в `docker-compose.yml`
4. После успешной регистрации пользователь получает права администратора

---

## 🔐 Безопасность

- **Хеширование паролей**: все пароли хешируются с использованием секретных строк
- **JWT токены**: используются для аутентификации
- **Активация пользователей**: только администратор может активировать новых пользователей
- **Изоляция базы данных**: порт PostgreSQL (5432) открыт только для локального доступа (127.0.0.1)

---

## 💾 Хранение файлов

В Docker-версии файлы пользователей сохраняются на диске хоста (не внутри контейнеров):
- **C:/Folder1** на хосте монтируется в `/usr/src/C/Folder1` внутри контейнера
- **D:/Folder1** на хосте монтируется в `/usr/src/D/Folder1` внутри контейнера

Настройка путей производится через переменные окружения `FILE_PATH` и `FILE_PATH2` в `docker-compose.yml` и соответствующие `volumes`.

---

## 📝 Ключевые отличия между режимами

| Что настраиваем | Локальная разработка | Docker |
|----------------|----------------------|--------|
| **Backend** | `constantDev.js` | `environment` в `docker-compose.yml` |
| **Адрес БД** | `localhost` | `postgres_db` (имя сервиса) |
| **Пути к файлам** | `C:/Folder1` (Windows) | `/usr/src/C/Folder1` (в контейнере) |
| **Frontend** | `npm run start` (порт 3000) | Nginx (порт 80) |
| **Адрес backend для frontend** | из `package.json` | из `nginx.conf` или переменных |