module.exports = class FileDto {
    id;
    name;
    type;
    path;
    url;
    size;
    originalUrl;
    createdAt;
    originalName;
    constructor(model) {
        this.id = model.id;
        this.name = model.name;
        this.type = model.type;
        this.url = model.url;
        this.createdAt = model.createdAt;
        this.size = model.size;
        this.originalName = model.originalName;
    }
};
