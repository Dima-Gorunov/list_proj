import { AxiosResponse } from "axios";
import { authInstance, instance } from "../../6_shared/api/instances";
import { IChangeUserResponce, IUser, IUsersResponce } from "./types";

export const UsersApi = {
    getAllUsers(): Promise<AxiosResponse<IUsersResponce>> {
        return authInstance.get("/api/user/getAllUsers");
    },
    changeUser(data: IUser): Promise<AxiosResponse<IChangeUserResponce>> {
        return authInstance.put("/api/user/changeUser", data);
    },
};
