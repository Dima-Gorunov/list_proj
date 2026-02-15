import { AxiosResponse } from "axios";
import { authInstance, instance } from "../../6_shared/api/instances";
import {
    RegistrationRequest,
    LoginRequest,
    UsersInfoRequest,
    AuthResponse,
    UserData,
    CheckAuthResponse,
    LogoutResponse,
    SetAvatarResponse,
    RegistrationResponse,
} from "./types";
import { IGetMyFilesResponse } from "../Files/types";

export const ProfileApi = {
    registration(data: RegistrationRequest): Promise<AxiosResponse<RegistrationResponse>> {
        return authInstance.post("/api/user/registration", data);
    },

    login(email: string, password: string): Promise<AxiosResponse<RegistrationResponse>> {
        const data: LoginRequest = { email, password };
        return authInstance.post("/api/user/login", data);
    },

    logout(): Promise<AxiosResponse<Boolean>> {
        return authInstance.post("/api/user/logout");
    },

    checkAuth(): Promise<AxiosResponse<RegistrationResponse>> {
        return instance.get("/api/user/refresh");
    },

    getMyFiles(): Promise<AxiosResponse<IGetMyFilesResponse>> {
        return authInstance.get("/api/user/getMyFiles");
    },

    setAvatar(formData: FormData): Promise<SetAvatarResponse> {
        return authInstance.put("/api/user/setavatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
