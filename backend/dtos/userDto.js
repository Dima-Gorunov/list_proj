module.exports = class UserDto {
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
    }
}