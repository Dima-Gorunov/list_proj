const jwt = require("jsonwebtoken");
const { User, File } = require("../models/models");
const { mkdir } = require("fs/promises");
const { join, resolve } = require("path");
const { clientName, JWT_ACCESS_STRING } = require("../constant");
const userService = require("../service/user-service");
const mailService = require("../service/mail-service");
const { validationResult } = require("express-validator");
const UserInfoDto = require("../dtos/userInfoDto");
const { Op } = require("sequelize");
const FileExclude = require("../dtos/excludeModels");

class UserController {
    // enabled
    async testRegistration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json({ result_code: 1, message: errors.array() });
            }
            const { email, password, secretAdminString } = req.body;
            const { user, accessToken, refreshToken } = await userService.registration(email, password, secretAdminString);
            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ user, accessToken });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async testLogin(req, res) {
        try {
            const { email, password } = req.body;
            const { accessToken, user, refreshToken } = await userService.login(email, password);
            res.cookie("refreshToken", refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ accessToken, user });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async activate(req, res) {
        try {
            const { link } = req.params;
            await userService.activate(link);
            return res.redirect(clientName);
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async testLogout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie("refreshToken");
            return res.json(true);
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            const { user, accessToken, ...ref } = await userService.refresh(refreshToken);
            res.cookie("refreshToken", ref.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
            return res.json({ accessToken, user });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async getInfo(req, res) {
        try {
            const senderId = req.user.id; //sender
            const { id } = req.body;
            const { usersId } = req.body; // if array<id>
            if (id) {
                const user = await User.findOne({ where: { id } });
                const userInfoDto = new UserInfoDto(user);
                return res.json({ user: userInfoDto });
            }
            if (usersId) {
                const users = await User.findAll({ where: { id: usersId } });
                const usersInfoDto = users.map((e, index) => new UserInfoDto(e));
                return res.json({ users: usersInfoDto });
            }
            const user = await User.findOne({ where: { id: senderId } });
            const userInfoDto = new UserInfoDto(user);
            return res.json({ user: userInfoDto });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: "get info error" });
        }
    }

    async setAvatar(req, res) {
        try {
            const { fileName, filePath, avatarUrl } = req;
            const { id } = req.user;
            if (!filePath || !filePath || !avatarUrl || !id) {
                return res.status(400).json({ result_code: 1, message: "insufficient data" });
            }
            await User.update({ avatar: avatarUrl }, { where: { id } });
            const file = await File.create({ name: fileName, type: "avatar", path: filePath, userId: id, url: avatarUrl });
            return res.json({ avatarUrl: file.url });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }
    // enabled
    async getAllUsers(req, res) {
        try {
            const { id } = req.user;
            const users = await User.findAll({
                where: {
                    id: { [Op.ne]: id },
                },
                order: [["id", "ASC"]],
            });
            const usersInfoDto = users.map((item) => new UserInfoDto(item));
            return res.json({ users: usersInfoDto });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }

    // enabled
    async changeUser(req, res) {
        try {
            const user = req.body;

            if (!user?.id) {
                return res.status(400).json({ result_code: 1, message: "id is required" });
            }
            if (user.id === req.user.id) {
                return res.status(400).json({ result_code: 1, message: "self change blocked" });
            }

            const dbUser = User.findOne({ where: { id: user.id } });
            if (!dbUser) {
                return res.status(400).json({ result_code: 1, message: "user not found" });
            }
            const updatedUser = { ...dbUser, ...user };
            await User.update(updatedUser, { where: { id: user.id } });
            return res.json({ user: new UserInfoDto(updatedUser) });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }

    // enabled
    async getMyFiles(req, res) {
        try {
            const user = req.user;
            if (!user?.id) {
                return res.status(400).json({ result_code: 1, message: "id is required" });
            }
            const dbUser = await User.findOne({ where: { id: user.id } });
            if (!dbUser) {
                return res.status(400).json({ result_code: 1, message: "user not found" });
            }
            const files = await File.findAll({ where: { userId: dbUser.id }, attributes: { exclude: FileExclude } });

            return res.json({ files });
        } catch (e) {
            return res.status(400).json({ result_code: 1, message: e.message });
        }
    }

    //------------------------------------------------------------
}

module.exports = new UserController();
