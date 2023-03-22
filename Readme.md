## О проекте
В данном проекте я показываю как работает клиентская часть приложения в связке с базой данных postgres.
Бекенд написан также на js (express+sequelize). Можно запустить на любом сервере с использованием docker и nginx. Вот пример проекта, 
готового к запуску на сервере c инструкциями: https://github.com/Dima-Gorunov/docker-nginx-deploy
## Development
Postgres должен быть установлен на вашем пк и создана база данных, название которой
в дальнейшем должно быть помещено в process.env.PGDATABASE или в переменную pgDatabase в файле `backend/constant.js`
### start client 
`npm start`, чтобы запустить client 


## start backend
`npm run start`, чтобы запустить client
`npm run start`, чтобы запустить backend

## Production

Данный проект создан для демонстрации, поэтому тут достаточно обойтись запуском на localhost.

Пример деплоя в production тут: https://github.com/Dima-Gorunov/docker-nginx-deploy, но там в основном демонстрация умений деплоя без особого css.

Пример деплоя в production тут: https://github.com/Dima-Gorunov/docker-nginx-deploy, но там в основном демонстрация умений деплоя без особого css.

