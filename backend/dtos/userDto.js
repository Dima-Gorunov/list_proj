module.exports = class UserDto {
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
    }
}