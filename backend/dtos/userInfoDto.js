module.exports = class UserInfoDto {
    id;
    email;
    activated;
    role;
    username;
    first_name;
    last_name;
    gender;
    avatar;

    constructor(model) {
        this.id = model.id;
        this.email = model.email;
        this.activated = model.activated;
        this.role = model.role;
        this.username = model.username;
        this.first_name = model.first_name;
        this.last_name = model.last_name;
        this.gender = model.gender;
        this.avatar = model.avatar;
    }
}