module.exports = class UserInfoDto {
    id;
    email;
    activated;
    role;
    username;
    firstName;
    lastName;
    gender;
    avatar;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.activated = model.activated;
        this.role = model.role;
        this.username = model.username;
        this.firstName = model.firstName;
        this.lastName = model.lastName;
        this.gender = model.gender;
        this.avatar = model.avatar;
        this.createdAt = model.createdAt;
        this.updatedAt = model.updatedAt;
    }
}