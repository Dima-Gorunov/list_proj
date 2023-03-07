
## О проекте
В данном проекте я показываю как работает клиентская часть приложения в связке с базой данных postgres.

Бекенд написан также на js (express+sequelize). Можно запустить на любом сервере с использованием docker и nginx. Вот пример проекта, 
готового к запуску на сервере c инструкциями: https://github.com/Dima-Gorunov/docker-nginx-deploy


## Development
После клонирования репозитория не забудьте выполнить команду `npm install`, находясь для установки node-modules.
Postgres тоже должен быть установлен на вашем пк
### start client 
`npm start`, чтобы запустить client 


### start backend
`npm run start`, чтобы запустить backend

## Production

Данный проект создан для демонстрации, поетому тут достаточно обойтись локалхостами.
Пример деплоя в production тут: https://github.com/Dima-Gorunov/docker-nginx-deploy, но там я не делал упор на css. Только демонстрация умений деплоя.