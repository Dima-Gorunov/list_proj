import { IFileType } from "../5_entities/Files/types";

// export const serverName: string = "http://localhost:5000";

export const serverName = () => {
    console.log("process.env.SERVER_NAME: ", process.env.SERVER_NAME);

    return process.env.SERVER_NAME;
};

export const FRONT_ROLES_STR = {
    ADMIN: "ADMIN",
    USER: "USER",
};

export const FRONT_ROUTES_STR = {
    main: "main",
    users: "users",
    myProfile: "myProfile",
    login: "login",
};

export const QUERY_STR_NULLABLE_ACCOUNT = "nullableAccount";

export const LOCAL_ST_TOKEN_STR = "token";

export const FILE_TYPES_CONST: Record<string, IFileType> = {
    files: "files",
    images: "images",
    videos: "videos",
};
