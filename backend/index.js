const { clientName, allFileFoldersPaths } = require("./constant");
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const router = require("./routes/index");
const WebSocket = require("ws");

const app = express();
const PORT = process.env.EXTERNAL_PORT || 5000;
const cookieParser = require("cookie-parser");
const AuthMiddleware = require("./middleware/AuthMiddleware");
const FileAccessMiddleware = require("./middleware/FileAccessMiddleware");

app.use(
    cors({
        credentials: true,
        origin: clientName,
    }),
);
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);

// Создаем массив middleware для каждого пути
const staticMiddlewares = allFileFoldersPaths.map((path) => express.static(path));

// Используем spread оператор
app.use(
    "/",
    AuthMiddleware,
    FileAccessMiddleware,
    ...staticMiddlewares, // ← все middleware из массива
);
app.use(function (err, req, res, next) {
    return res.status(err.status || 500).json({ status_code: 1, message: err.message });
});

const start = async () => {
    try {
        for (key in models) {
            await models[key].sync({ alter: true });
        }
        await sequelize.authenticate(); // if {force:true} => all data=0
        await sequelize.sync();
        app.listen(PORT, () => console.log(`start on ${PORT} port`));
    } catch (e) {
        console.log(e);
    }
};
start();
