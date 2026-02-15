import { AxiosResponse } from "axios";
import { authInstance, instance } from "../../6_shared/api/instances";
import { IDeleteMyFilesResponse, IUploadResponse } from "./types";

export const FilesApi = {
    upload(file: File): Promise<AxiosResponse<IUploadResponse>> {
        const formData = new FormData();
        formData.append("file", file);
        return authInstance.post("/api/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    delete(ids: number[]): Promise<AxiosResponse<IDeleteMyFilesResponse>> {
        return authInstance.delete("/api/file/delete", {
            data: ids,
        });
    },
};
